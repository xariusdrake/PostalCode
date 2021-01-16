import { ArgsType, Field } from "@nestjs/graphql";
import { PostalCodeCreateInput } from "./PostalCodeCreateInput";

@ArgsType()
class CreatePostalCodeArgs {
  @Field(() => PostalCodeCreateInput, { nullable: false })
  data!: PostalCodeCreateInput;
}

export { CreatePostalCodeArgs };
