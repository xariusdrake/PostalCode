import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { StoreService } from "./store.service";
import { CreateStoreArgs } from "./CreateStoreArgs";
import { UpdateStoreArgs } from "./UpdateStoreArgs";
import { DeleteStoreArgs } from "./DeleteStoreArgs";
import { FindManyStoreArgs } from "./FindManyStoreArgs";
import { FindOneStoreArgs } from "./FindOneStoreArgs";
import { Store } from "./Store";

@graphql.Resolver(() => Store)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class StoreResolver {
  constructor(
    private readonly service: StoreService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Store])
  @nestAccessControl.UseRoles({
    resource: "Store",
    action: "read",
    possession: "any",
  })
  async stores(
    @graphql.Args() args: FindManyStoreArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Store[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Store",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Store, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Store",
    action: "read",
    possession: "own",
  })
  async store(
    @graphql.Args() args: FindOneStoreArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Store | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Store",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Store)
  @nestAccessControl.UseRoles({
    resource: "Store",
    action: "create",
    possession: "any",
  })
  async createStore(
    @graphql.Args() args: CreateStoreArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Store> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Store",
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
        `providing the properties: ${properties} on ${"Store"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Store)
  @nestAccessControl.UseRoles({
    resource: "Store",
    action: "update",
    possession: "any",
  })
  async updateStore(
    @graphql.Args() args: UpdateStoreArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Store | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Store",
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
        `providing the properties: ${properties} on ${"Store"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Store)
  @nestAccessControl.UseRoles({
    resource: "Store",
    action: "delete",
    possession: "any",
  })
  async deleteStore(
    @graphql.Args() args: DeleteStoreArgs
  ): Promise<Store | null> {
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
