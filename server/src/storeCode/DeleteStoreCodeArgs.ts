import { ArgsType, Field } from "@nestjs/graphql";
import { StoreCodeWhereUniqueInput } from "./StoreCodeWhereUniqueInput";

@ArgsType()
class DeleteStoreCodeArgs {
  @Field(() => StoreCodeWhereUniqueInput, { nullable: false })
  where!: StoreCodeWhereUniqueInput;
}

export { DeleteStoreCodeArgs };
