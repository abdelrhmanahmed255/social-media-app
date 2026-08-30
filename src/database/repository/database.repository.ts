import {
  FilterQuery,
  Model,
  PopulateOptions,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from "mongoose";

export class DatabaseRepository<TRawDoc> {
  constructor(private model: Model<TRawDoc>) {}

  create(data: Partial<TRawDoc>) {
    return this.model.create(data);
  }

  findAll({
    filter = {},
    select,
    populate,
    lean = true,
  }: {
    filter?: FilterQuery<TRawDoc>;
    select?: ProjectionType<TRawDoc> | string;
    populate?: PopulateOptions | PopulateOptions[];
    lean?: boolean;
  } = {}) {
    let query: any = this.model.find(filter);

    if (select) query = query.select(select);
    if (populate) query = query.populate(populate);
    if (lean) query = query.lean();

    return query.exec();
  }

  findById({
    id,
    select,
    populate,
    lean = true,
  }: {
    id: string;
    select?: ProjectionType<TRawDoc> | string;
    populate?: PopulateOptions | PopulateOptions[];
    lean?: boolean;
  }) {
    let query: any = this.model.findById(id);

    if (select) query = query.select(select);
    if (populate) query = query.populate(populate);
    if (lean) query = query.lean();

    return query.exec();
  }

  findOne({
    filter,
    select,
    populate,
    lean = true,
  }: {
    filter: FilterQuery<TRawDoc>;
    select?: ProjectionType<TRawDoc> | string;
    populate?: PopulateOptions | PopulateOptions[];
    lean?: boolean;
  }) {
    let query: any = this.model.findOne(filter);

    if (select) query = query.select(select);
    if (populate) query = query.populate(populate);
    if (lean) query = query.lean();

    return query.exec();
  }

  updateOne({
    filter,
    data,
  }: {
    filter: FilterQuery<TRawDoc>;
    data: UpdateQuery<TRawDoc>;
    options?: QueryOptions;
  }) {
    return this.model.updateOne(filter, data);
  }

  findByIdAndUpdate({
    id,
    data,
    options = { new: true },
  }: {
    id: string;
    data: UpdateQuery<TRawDoc>;
    options?: QueryOptions;
  }) {
    return this.model.findByIdAndUpdate(id, data, options);
  }

  deleteOne(filter: FilterQuery<TRawDoc>) {
    return this.model.deleteOne(filter);
  }
}
