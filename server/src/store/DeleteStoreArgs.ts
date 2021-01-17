import { ArgsType, Field } from "@nestjs/graphql";
import { StoreWhereUniqueInput } from "./StoreWhereUniqueInput";

@ArgsType()
class DeleteStoreArgs {
  @Field(() => StoreWhereUniqueInput, { nullable: false })
  where!: StoreWhereUniqueInput;
}

export { DeleteStoreArgs };
