// src/common/models/models.service.ts
import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';

export type Options = {
  where?: Record<string, any>;
  include?: any[] | undefined;
  attributes?: string[] | object;
  group?: string[];
  raw?: boolean;
  order?: any[];
  distinct?: boolean;
  page?: number | any;
  size?: number;
  limit?: number;
  offset?: number;
  subQuery?: boolean;
};

@Injectable()
export class ModelsService {
  constructor() {}

  async getDataService(model: any, options: Options): Promise<any> {
    const optionsResult = this.validateOptions(options);
    const data = await model.findOne(optionsResult);
    return data;
  }

  async getDataByIdService(model: any, id: number): Promise<any> {
    const data = await model.findByPk(id);
    return data;
  }

  async createDataService(
    model: any,
    modelData: any,
    transaction: Transaction | null = null,
  ): Promise<any> {
    const options = transaction ? { transaction } : {};
    const data = await model.create(modelData, options);
    return data;
  }

  async updateDataService(
    model: any,
    id: number,
    modelData: any,
    transaction: Transaction | null = null,
  ): Promise<number> {
    const options = {
      where: { id },
      ...(transaction ? { transaction } : {}),
    };

    const [rowsAffected] = await model.update(modelData, options);
    return rowsAffected;
  }

  async deleteDataService(
    model: any,
    id: number,
    transaction: Transaction | null = null,
  ): Promise<number> {
    const options = {
      where: { id },
      ...(transaction ? { transaction } : {}),
    };

    const rowsAffected = await model.destroy(options);
    return rowsAffected;
  }

  async getAllDataService(model: any, options: Options): Promise<any[]> {
    const data = await model.findAll(options);
    return data;
  }

  async getAllDataWithPaginationService(
    model: any,
    options: Options,
    isInclude: boolean = false,
  ): Promise<any> {
    const data = await this.pagination(model, options, isInclude);
    return data;
  }

  async findOrCreateDataService(
    model: any,
    where: any,
    defaults: any,
    transaction: Transaction | null = null,
  ): Promise<[any, boolean]> {
    const options = transaction
      ? { where, defaults, transaction }
      : { where, defaults };
    const [result, created] = await model.findOrCreate(options);
    return [result, created];
  }

  async findAndCountAllDataService(model: any, options: Options): Promise<any> {
    const data = await model.findAndCountAll(options);
    return data;
  }

  async countDataService(model: any, options: Options): Promise<number> {
    const count = await model.count(options);
    return count;
  }

  private validateOptions(options: Options): Options {
    let { where = {}, include = [], attributes = [], group = [] } = options;

    where = Object.keys(where).length !== 0 ? where : {};
    include = include.length !== 0 ? include : [];
    attributes =
      Array.isArray(attributes) && attributes.length !== 0
        ? attributes
        : Object.keys(attributes).length !== 0
          ? attributes
          : {};
    group = group.length !== 0 ? group : [];

    return { where, include, attributes, group };
  }

  private async pagination(
    model: any,
    options: Options,
    isInclude: boolean,
  ): Promise<any> {
    let {
      page = 1,
      size = 20,
      where = {},
      include = [],
      order = [],
      attributes = [],
    } = options;

    const offset = (page - 1) * size;

    attributes =
      Array.isArray(attributes) && attributes.length !== 0
        ? attributes
        : Object.keys(attributes).length !== 0
          ? attributes
          : {};
    where = Object.keys(where).length !== 0 ? where : {};
    include = include.length !== 0 ? include : [];
    order = order.length !== 0 ? order : [];

    const countOptions: any = {
      where,
    };

    if (isInclude) {
      countOptions.include = include;
    }

    const count = await model.count(countOptions);

    const data = await model.findAll({
      where,
      include,
      attributes,
      limit: size,
      offset,
      order,
    });

    const pages = Math.ceil(count / size);

    return {
      total_records: count,
      current_page: parseInt(page),
      last_page: pages,
      data,
    };
  }
}
