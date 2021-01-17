import { ArgsType, Field } from "@nestjs/graphql";
import { StoreCreateInput } from "./StoreCreateInput";

@ArgsType()
class CreateStoreArgs {
  @Field(() => StoreCreateInput, { nullable: false })
  data!: StoreCreateInput;
}

export { CreateStoreArgs };
