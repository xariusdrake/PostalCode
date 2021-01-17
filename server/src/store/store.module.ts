import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { StoreService } from "./store.service";
import { StoreController } from "./store.controller";
import { StoreResolver } from "./store.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [StoreController],
  providers: [StoreService, StoreResolver],
  exports: [StoreService],
})
export class StoreModule {}
