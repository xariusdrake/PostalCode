import { ArgsType, Field } from "@nestjs/graphql";
import { StoreWhereInput } from "./StoreWhereInput";

@ArgsType()
class FindManyStoreArgs {
  @Field(() => StoreWhereInput, { nullable: true })
  where?: StoreWhereInput;
}

export { FindManyStoreArgs };
