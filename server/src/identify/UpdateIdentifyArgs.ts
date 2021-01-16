import { ArgsType, Field } from "@nestjs/graphql";
import { IdentifyWhereUniqueInput } from "./IdentifyWhereUniqueInput";
import { IdentifyUpdateInput } from "./IdentifyUpdateInput";

@ArgsType()
class UpdateIdentifyArgs {
  @Field(() => IdentifyWhereUniqueInput, { nullable: false })
  where!: IdentifyWhereUniqueInput;
  @Field(() => IdentifyUpdateInput, { nullable: false })
  data!: IdentifyUpdateInput;
}

export { UpdateIdentifyArgs };
