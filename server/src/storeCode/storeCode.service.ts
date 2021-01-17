import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneStoreCodeArgs,
  FindManyStoreCodeArgs,
  StoreCodeCreateArgs,
  StoreCodeUpdateArgs,
  StoreCodeDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class StoreCodeService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyStoreCodeArgs>(
    args: Subset<T, FindManyStoreCodeArgs>
  ) {
    return this.prisma.storeCode.findMany(args);
  }
  findOne<T extends FindOneStoreCodeArgs>(
    args: Subset<T, FindOneStoreCodeArgs>
  ) {
    return this.prisma.storeCode.findOne(args);
  }
  create<T extends StoreCodeCreateArgs>(args: Subset<T, StoreCodeCreateArgs>) {
    return this.prisma.storeCode.create<T>(args);
  }
  update<T extends StoreCodeUpdateArgs>(args: Subset<T, StoreCodeUpdateArgs>) {
    return this.prisma.storeCode.update<T>(args);
  }
  delete<T extends StoreCodeDeleteArgs>(args: Subset<T, StoreCodeDeleteArgs>) {
    return this.prisma.storeCode.delete(args);
  }
}
