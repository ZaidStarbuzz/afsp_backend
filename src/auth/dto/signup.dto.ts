import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class GeoLocationDto {
  @IsNotEmpty()
  latitude: number;

  @IsNotEmpty()
  longitude: number;
}

export class SignupOtpDto {
  @IsEmail({}, { message: 'Invalid Email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsOptional()
  @Matches(/^\+\d{12}$/, {
    message: 'Mobile number must be in the format +91<10-digit-number>',
  })
  mobile?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => GeoLocationDto)
  geo_location?: GeoLocationDto;

  @IsOptional()
  location?: string;

  @IsOptional()
  @IsArray()
  nicheIds?: number[];
}
