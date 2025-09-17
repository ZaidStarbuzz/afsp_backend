import { BadRequestException, Injectable, Inject } from '@nestjs/common';
import { ModelsService } from 'src/common/models/models.service';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class PlatformsService {
  constructor(
    @Inject('MODELS') private readonly models,
    private readonly modelsService: ModelsService,
  ) {}

  async findAll() {
    try {
      const platforms = await this.modelsService.getAllDataService(
        this.models.prjModels.Platforms,
        {
          attributes: [
            'id',
            'name',
            'short_name',
            'is_active',
            'createdAt',
            'updatedAt',
          ],
        },
      );

      return successResponse(200, platforms, 'Platforms fetched successfully');
    } catch (err) {
      throw new BadRequestException('Error fetching platforms');
    }
  }
}
