import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { IdentifyService } from "./identify.service";
import { IdentifyController } from "./identify.controller";
import { IdentifyResolver } from "./identify.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [IdentifyController],
  providers: [IdentifyService, IdentifyResolver],
  exports: [IdentifyService],
})
export class IdentifyModule {}
