import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneIdentifyArgs,
  FindManyIdentifyArgs,
  IdentifyCreateArgs,
  IdentifyUpdateArgs,
  IdentifyDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class IdentifyService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyIdentifyArgs>(
    args: Subset<T, FindManyIdentifyArgs>
  ) {
    return this.prisma.identify.findMany(args);
  }
  findOne<T extends FindOneIdentifyArgs>(args: Subset<T, FindOneIdentifyArgs>) {
    return this.prisma.identify.findOne(args);
  }
  create<T extends IdentifyCreateArgs>(args: Subset<T, IdentifyCreateArgs>) {
    return this.prisma.identify.create<T>(args);
  }
  update<T extends IdentifyUpdateArgs>(args: Subset<T, IdentifyUpdateArgs>) {
    return this.prisma.identify.update<T>(args);
  }
  delete<T extends IdentifyDeleteArgs>(args: Subset<T, IdentifyDeleteArgs>) {
    return this.prisma.identify.delete(args);
  }
}
