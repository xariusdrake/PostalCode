import { ArgsType, Field } from "@nestjs/graphql";
import { StoreCodeWhereUniqueInput } from "./StoreCodeWhereUniqueInput";

@ArgsType()
class FindOneStoreCodeArgs {
  @Field(() => StoreCodeWhereUniqueInput, { nullable: false })
  where!: StoreCodeWhereUniqueInput;
}

export { FindOneStoreCodeArgs };
