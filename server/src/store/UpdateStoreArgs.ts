import { ArgsType, Field } from "@nestjs/graphql";
import { StoreWhereUniqueInput } from "./StoreWhereUniqueInput";
import { StoreUpdateInput } from "./StoreUpdateInput";

@ArgsType()
class UpdateStoreArgs {
  @Field(() => StoreWhereUniqueInput, { nullable: false })
  where!: StoreWhereUniqueInput;
  @Field(() => StoreUpdateInput, { nullable: false })
  data!: StoreUpdateInput;
}

export { UpdateStoreArgs };
