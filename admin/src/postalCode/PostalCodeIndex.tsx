import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { PostalCodeList } from "./PostalCodeList";
import { CreatePostalCode } from "./CreatePostalCode";
import { PostalCode } from "./PostalCode";

export const PostalCodeIndex = (): React.ReactElement => {
  useBreadcrumbs("/postal-codes/", "PostalCodes");

  return (
    <Switch>
      <PrivateRoute exact path={"/postal-codes/"} component={PostalCodeList} />
      <PrivateRoute path={"/postal-codes/new"} component={CreatePostalCode} />
      <PrivateRoute path={"/postal-codes/:id"} component={PostalCode} />
    </Switch>
  );
};
