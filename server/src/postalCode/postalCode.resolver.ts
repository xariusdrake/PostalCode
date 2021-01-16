import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { PostalCodeService } from "./postalCode.service";
import { CreatePostalCodeArgs } from "./CreatePostalCodeArgs";
import { UpdatePostalCodeArgs } from "./UpdatePostalCodeArgs";
import { DeletePostalCodeArgs } from "./DeletePostalCodeArgs";
import { FindManyPostalCodeArgs } from "./FindManyPostalCodeArgs";
import { FindOnePostalCodeArgs } from "./FindOnePostalCodeArgs";
import { PostalCode } from "./PostalCode";

@graphql.Resolver(() => PostalCode)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class PostalCodeResolver {
  constructor(
    private readonly service: PostalCodeService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [PostalCode])
  @nestAccessControl.UseRoles({
    resource: "PostalCode",
    action: "read",
    possession: "any",
  })
  async postalCodes(
    @graphql.Args() args: FindManyPostalCodeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PostalCode[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "PostalCode",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => PostalCode, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "PostalCode",
    action: "read",
    possession: "own",
  })
  async postalCode(
    @graphql.Args() args: FindOnePostalCodeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PostalCode | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "PostalCode",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => PostalCode)
  @nestAccessControl.UseRoles({
    resource: "PostalCode",
    action: "create",
    possession: "any",
  })
  async createPostalCode(
    @graphql.Args() args: CreatePostalCodeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PostalCode> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "PostalCode",
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
        `providing the properties: ${properties} on ${"PostalCode"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => PostalCode)
  @nestAccessControl.UseRoles({
    resource: "PostalCode",
    action: "update",
    possession: "any",
  })
  async updatePostalCode(
    @graphql.Args() args: UpdatePostalCodeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PostalCode | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "PostalCode",
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
        `providing the properties: ${properties} on ${"PostalCode"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => PostalCode)
  @nestAccessControl.UseRoles({
    resource: "PostalCode",
    action: "delete",
    possession: "any",
  })
  async deletePostalCode(
    @graphql.Args() args: DeletePostalCodeArgs
  ): Promise<PostalCode | null> {
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
