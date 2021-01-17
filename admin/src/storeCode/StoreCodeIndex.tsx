import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { StoreCodeList } from "./StoreCodeList";
import { CreateStoreCode } from "./CreateStoreCode";
import { StoreCode } from "./StoreCode";

export const StoreCodeIndex = (): React.ReactElement => {
  useBreadcrumbs("/store-codes/", "StoreCode");

  return (
    <Switch>
      <PrivateRoute exact path={"/store-codes/"} component={StoreCodeList} />
      <PrivateRoute path={"/store-codes/new"} component={CreateStoreCode} />
      <PrivateRoute path={"/store-codes/:id"} component={StoreCode} />
    </Switch>
  );
};
