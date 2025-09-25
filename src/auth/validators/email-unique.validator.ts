import { Inject, Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'EmailUnique', async: true })
@Injectable()
export class EmailUnique implements ValidatorConstraintInterface {
  constructor(@Inject('MODELS') private readonly models) {}

  async validate(email: string, args: ValidationArguments): Promise<boolean> {
    const [users, organisations, brands] = await Promise.all([
      this.models.saasModels.Users.findAll({ where: { email } }),
      this.models.saasModels.Organisations.findAll({ where: { email } }),
      this.models.saasModels.Brands.findAll({ where: { email } }),
    ]);

    return users.length + organisations.length + brands.length === 0;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email address already taken';
  }
}
