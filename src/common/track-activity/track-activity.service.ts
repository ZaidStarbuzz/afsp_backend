import { Inject, Injectable } from '@nestjs/common';
import { ModelsService } from '../models/models.service';

@Injectable()
export class TrackActivityService {
  constructor(
    @Inject('MODELS') private readonly models,
    private readonly modelsService: ModelsService,
  ) {}

  async log({ userId, event_type, event_time, sequelizeTransaction }) {
    const createActivityLog = await this.modelsService.createDataService(
      this.models.prjModels.ActivityLogs,
      {
        userId,
        event_type,
        event_time,
      },
      sequelizeTransaction,
    );
    return createActivityLog;
  }
}
