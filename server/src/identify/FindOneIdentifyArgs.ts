import { ArgsType, Field } from "@nestjs/graphql";
import { IdentifyWhereUniqueInput } from "./IdentifyWhereUniqueInput";

@ArgsType()
class FindOneIdentifyArgs {
  @Field(() => IdentifyWhereUniqueInput, { nullable: false })
  where!: IdentifyWhereUniqueInput;
}

export { FindOneIdentifyArgs };
