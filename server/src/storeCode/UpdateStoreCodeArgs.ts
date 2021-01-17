import { ArgsType, Field } from "@nestjs/graphql";
import { StoreCodeWhereUniqueInput } from "./StoreCodeWhereUniqueInput";
import { StoreCodeUpdateInput } from "./StoreCodeUpdateInput";

@ArgsType()
class UpdateStoreCodeArgs {
  @Field(() => StoreCodeWhereUniqueInput, { nullable: false })
  where!: StoreCodeWhereUniqueInput;
  @Field(() => StoreCodeUpdateInput, { nullable: false })
  data!: StoreCodeUpdateInput;
}

export { UpdateStoreCodeArgs };
