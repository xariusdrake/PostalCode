import { ArgsType, Field } from "@nestjs/graphql";
import { IdentifyCreateInput } from "./IdentifyCreateInput";

@ArgsType()
class CreateIdentifyArgs {
  @Field(() => IdentifyCreateInput, { nullable: false })
  data!: IdentifyCreateInput;
}

export { CreateIdentifyArgs };
