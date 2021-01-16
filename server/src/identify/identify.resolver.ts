import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { IdentifyService } from "./identify.service";
import { CreateIdentifyArgs } from "./CreateIdentifyArgs";
import { UpdateIdentifyArgs } from "./UpdateIdentifyArgs";
import { DeleteIdentifyArgs } from "./DeleteIdentifyArgs";
import { FindManyIdentifyArgs } from "./FindManyIdentifyArgs";
import { FindOneIdentifyArgs } from "./FindOneIdentifyArgs";
import { Identify } from "./Identify";

@graphql.Resolver(() => Identify)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class IdentifyResolver {
  constructor(
    private readonly service: IdentifyService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Identify])
  @nestAccessControl.UseRoles({
    resource: "Identify",
    action: "read",
    possession: "any",
  })
  async identifies(
    @graphql.Args() args: FindManyIdentifyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Identify[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Identify",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Identify, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Identify",
    action: "read",
    possession: "own",
  })
  async identify(
    @graphql.Args() args: FindOneIdentifyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Identify | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Identify",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Identify)
  @nestAccessControl.UseRoles({
    resource: "Identify",
    action: "create",
    possession: "any",
  })
  async createIdentify(
    @graphql.Args() args: CreateIdentifyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Identify> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Identify",
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
        `providing the properties: ${properties} on ${"Identify"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Identify)
  @nestAccessControl.UseRoles({
    resource: "Identify",
    action: "update",
    possession: "any",
  })
  async updateIdentify(
    @graphql.Args() args: UpdateIdentifyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Identify | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Identify",
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
        `providing the properties: ${properties} on ${"Identify"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Identify)
  @nestAccessControl.UseRoles({
    resource: "Identify",
    action: "delete",
    possession: "any",
  })
  async deleteIdentify(
    @graphql.Args() args: DeleteIdentifyArgs
  ): Promise<Identify | null> {
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
