import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
  ToggleField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { StoreCode } from "../api/storeCode/StoreCode";
import { StoreCodeCreateInput } from "../api/storeCode/StoreCodeCreateInput";

const INITIAL_VALUES = {} as StoreCodeCreateInput;

export const CreateStoreCode = (): React.ReactElement => {
  useBreadcrumbs("/store-codes/new", "Create StoreCode");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    StoreCode,
    AxiosError,
    StoreCodeCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/store-codes", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/store-codes"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: StoreCodeCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create StoreCode"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
