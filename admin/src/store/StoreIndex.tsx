import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { StoreList } from "./StoreList";
import { CreateStore } from "./CreateStore";
import { Store } from "./Store";

export const StoreIndex = (): React.ReactElement => {
  useBreadcrumbs("/stores/", "Stores");

  return (
    <Switch>
      <PrivateRoute exact path={"/stores/"} component={StoreList} />
      <PrivateRoute path={"/stores/new"} component={CreateStore} />
      <PrivateRoute path={"/stores/:id"} component={Store} />
    </Switch>
  );
};
