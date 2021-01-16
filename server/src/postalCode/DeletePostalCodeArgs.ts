import { ArgsType, Field } from "@nestjs/graphql";
import { PostalCodeWhereUniqueInput } from "./PostalCodeWhereUniqueInput";

@ArgsType()
class DeletePostalCodeArgs {
  @Field(() => PostalCodeWhereUniqueInput, { nullable: false })
  where!: PostalCodeWhereUniqueInput;
}

export { DeletePostalCodeArgs };
