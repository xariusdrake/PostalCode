import { ArgsType, Field } from "@nestjs/graphql";
import { PostalCodeWhereInput } from "./PostalCodeWhereInput";

@ArgsType()
class FindManyPostalCodeArgs {
  @Field(() => PostalCodeWhereInput, { nullable: true })
  where?: PostalCodeWhereInput;
}

export { FindManyPostalCodeArgs };
