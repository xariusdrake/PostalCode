import { ArgsType, Field } from "@nestjs/graphql";
import { IdentifyWhereUniqueInput } from "./IdentifyWhereUniqueInput";

@ArgsType()
class DeleteIdentifyArgs {
  @Field(() => IdentifyWhereUniqueInput, { nullable: false })
  where!: IdentifyWhereUniqueInput;
}

export { DeleteIdentifyArgs };
