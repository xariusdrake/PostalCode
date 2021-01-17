import { ArgsType, Field } from "@nestjs/graphql";
import { StoreWhereUniqueInput } from "./StoreWhereUniqueInput";

@ArgsType()
class FindOneStoreArgs {
  @Field(() => StoreWhereUniqueInput, { nullable: false })
  where!: StoreWhereUniqueInput;
}

export { FindOneStoreArgs };
