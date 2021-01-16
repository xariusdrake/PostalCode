import { ArgsType, Field } from "@nestjs/graphql";
import { IdentifyWhereInput } from "./IdentifyWhereInput";

@ArgsType()
class FindManyIdentifyArgs {
  @Field(() => IdentifyWhereInput, { nullable: true })
  where?: IdentifyWhereInput;
}

export { FindManyIdentifyArgs };
