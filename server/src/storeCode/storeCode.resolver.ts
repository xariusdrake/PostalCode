import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { StoreCodeService } from "./storeCode.service";
import { CreateStoreCodeArgs } from "./CreateStoreCodeArgs";
import { UpdateStoreCodeArgs } from "./UpdateStoreCodeArgs";
import { DeleteStoreCodeArgs } from "./DeleteStoreCodeArgs";
import { FindManyStoreCodeArgs } from "./FindManyStoreCodeArgs";
import { FindOneStoreCodeArgs } from "./FindOneStoreCodeArgs";
import { StoreCode } from "./StoreCode";

@graphql.Resolver(() => StoreCode)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class StoreCodeResolver {
  constructor(
    private readonly service: StoreCodeService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [StoreCode])
  @nestAccessControl.UseRoles({
    resource: "StoreCode",
    action: "read",
    possession: "any",
  })
  async storeCode(
    @graphql.Args() args: FindManyStoreCodeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<StoreCode[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "StoreCode",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => StoreCode, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "StoreCode",
    action: "read",
    possession: "own",
  })
  async storeCode(
    @graphql.Args() args: FindOneStoreCodeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<StoreCode | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "StoreCode",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => StoreCode)
  @nestAccessControl.UseRoles({
    resource: "StoreCode",
    action: "create",
    possession: "any",
  })
  async createStoreCode(
    @graphql.Args() args: CreateStoreCodeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<StoreCode> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "StoreCode",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"StoreCode"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => StoreCode)
  @nestAccessControl.UseRoles({
    resource: "StoreCode",
    action: "update",
    possession: "any",
  })
  async updateStoreCode(
    @graphql.Args() args: UpdateStoreCodeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<StoreCode | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "StoreCode",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"StoreCode"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => StoreCode)
  @nestAccessControl.UseRoles({
    resource: "StoreCode",
    action: "delete",
    possession: "any",
  })
  async deleteStoreCode(
    @graphql.Args() args: DeleteStoreCodeArgs
  ): Promise<StoreCode | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
