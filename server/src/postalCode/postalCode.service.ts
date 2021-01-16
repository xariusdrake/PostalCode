import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOnePostalCodeArgs,
  FindManyPostalCodeArgs,
  PostalCodeCreateArgs,
  PostalCodeUpdateArgs,
  PostalCodeDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class PostalCodeService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyPostalCodeArgs>(
    args: Subset<T, FindManyPostalCodeArgs>
  ) {
    return this.prisma.postalCode.findMany(args);
  }
  findOne<T extends FindOnePostalCodeArgs>(
    args: Subset<T, FindOnePostalCodeArgs>
  ) {
    return this.prisma.postalCode.findOne(args);
  }
  create<T extends PostalCodeCreateArgs>(
    args: Subset<T, PostalCodeCreateArgs>
  ) {
    return this.prisma.postalCode.create<T>(args);
  }
  update<T extends PostalCodeUpdateArgs>(
    args: Subset<T, PostalCodeUpdateArgs>
  ) {
    return this.prisma.postalCode.update<T>(args);
  }
  delete<T extends PostalCodeDeleteArgs>(
    args: Subset<T, PostalCodeDeleteArgs>
  ) {
    return this.prisma.postalCode.delete(args);
  }
}
