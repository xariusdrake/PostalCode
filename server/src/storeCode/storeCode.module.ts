import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { StoreCodeService } from "./storeCode.service";
import { StoreCodeController } from "./storeCode.controller";
import { StoreCodeResolver } from "./storeCode.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [StoreCodeController],
  providers: [StoreCodeService, StoreCodeResolver],
  exports: [StoreCodeService],
})
export class StoreCodeModule {}
