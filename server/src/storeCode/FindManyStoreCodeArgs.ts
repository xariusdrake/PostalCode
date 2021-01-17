import { ArgsType, Field } from "@nestjs/graphql";
import { StoreCodeWhereInput } from "./StoreCodeWhereInput";

@ArgsType()
class FindManyStoreCodeArgs {
  @Field(() => StoreCodeWhereInput, { nullable: true })
  where?: StoreCodeWhereInput;
}

export { FindManyStoreCodeArgs };
