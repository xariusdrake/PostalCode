import { ArgsType, Field } from "@nestjs/graphql";
import { StoreCodeCreateInput } from "./StoreCodeCreateInput";

@ArgsType()
class CreateStoreCodeArgs {
  @Field(() => StoreCodeCreateInput, { nullable: false })
  data!: StoreCodeCreateInput;
}

export { CreateStoreCodeArgs };
