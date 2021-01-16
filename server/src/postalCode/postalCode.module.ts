import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { PostalCodeService } from "./postalCode.service";
import { PostalCodeController } from "./postalCode.controller";
import { PostalCodeResolver } from "./postalCode.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [PostalCodeController],
  providers: [PostalCodeService, PostalCodeResolver],
  exports: [PostalCodeService],
})
export class PostalCodeModule {}
