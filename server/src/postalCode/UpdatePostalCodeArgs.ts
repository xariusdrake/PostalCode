import { ArgsType, Field } from "@nestjs/graphql";
import { PostalCodeWhereUniqueInput } from "./PostalCodeWhereUniqueInput";
import { PostalCodeUpdateInput } from "./PostalCodeUpdateInput";

@ArgsType()
class UpdatePostalCodeArgs {
  @Field(() => PostalCodeWhereUniqueInput, { nullable: false })
  where!: PostalCodeWhereUniqueInput;
  @Field(() => PostalCodeUpdateInput, { nullable: false })
  data!: PostalCodeUpdateInput;
}

export { UpdatePostalCodeArgs };
