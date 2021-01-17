import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneStoreArgs,
  FindManyStoreArgs,
  StoreCreateArgs,
  StoreUpdateArgs,
  StoreDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyStoreArgs>(args: Subset<T, FindManyStoreArgs>) {
    return this.prisma.store.findMany(args);
  }
  findOne<T extends FindOneStoreArgs>(args: Subset<T, FindOneStoreArgs>) {
    return this.prisma.store.findOne(args);
  }
  create<T extends StoreCreateArgs>(args: Subset<T, StoreCreateArgs>) {
    return this.prisma.store.create<T>(args);
  }
  update<T extends StoreUpdateArgs>(args: Subset<T, StoreUpdateArgs>) {
    return this.prisma.store.update<T>(args);
  }
  delete<T extends StoreDeleteArgs>(args: Subset<T, StoreDeleteArgs>) {
    return this.prisma.store.delete(args);
  }
}
