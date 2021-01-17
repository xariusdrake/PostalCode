import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
  ToggleField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { StoreCode as TStoreCode } from "../api/storeCode/StoreCode";
import { StoreCodeUpdateInput } from "../api/storeCode/StoreCodeUpdateInput";

export const StoreCode = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/store-codes/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TStoreCode,
    AxiosError,
    [string, string]
  >(["get-/api/store-codes", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/store-codes"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TStoreCode, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/store-codes"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//store-codes");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TStoreCode, AxiosError, StoreCodeUpdateInput>(
    async (data) => {
      const response = await api.patch(`${"/api/store-codes"}/${id}`, data);
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: StoreCodeUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.qrCode);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["qrCode", "isDelete", "storeId"]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"StoreCode"} ${
                  data?.qrCode && data?.qrCode.length ? data.qrCode : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
                  Save
                </Button>
              </FormHeader>
            }
          >
            <div>
              <TextField label="code" name="qrCode" />
            </div>
            <div>
              <ToggleField label="Is Delete" name="isDelete" />
            </div>
            <div>
              <TextField label="Store Id" name="storeId" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
