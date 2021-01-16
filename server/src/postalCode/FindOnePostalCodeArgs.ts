import { ArgsType, Field } from "@nestjs/graphql";
import { PostalCodeWhereUniqueInput } from "./PostalCodeWhereUniqueInput";

@ArgsType()
class FindOnePostalCodeArgs {
  @Field(() => PostalCodeWhereUniqueInput, { nullable: false })
  where!: PostalCodeWhereUniqueInput;
}

export { FindOnePostalCodeArgs };
