import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { IdentifyList } from "./IdentifyList";
import { CreateIdentify } from "./CreateIdentify";
import { Identify } from "./Identify";

export const IdentifyIndex = (): React.ReactElement => {
  useBreadcrumbs("/identifies/", "Identifies");

  return (
    <Switch>
      <PrivateRoute exact path={"/identifies/"} component={IdentifyList} />
      <PrivateRoute path={"/identifies/new"} component={CreateIdentify} />
      <PrivateRoute path={"/identifies/:id"} component={Identify} />
    </Switch>
  );
};
