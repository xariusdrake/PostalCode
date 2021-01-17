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
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Store } from "../api/store/Store";
import { StoreCreateInput } from "../api/store/StoreCreateInput";

const INITIAL_VALUES = {} as StoreCreateInput;

export const CreateStore = (): React.ReactElement => {
  useBreadcrumbs("/stores/new", "Create Store");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Store,
    AxiosError,
    StoreCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/stores", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/stores"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: StoreCreateInput) => {
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
            <FormHeader title={"Create Store"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="Address" name="address" />
          </div>
          <div>
            <TextField label="Creator Id" name="creatorId" />
          </div>
          <div>
            <TextField label="Geo Location" name="geoLocation" />
          </div>
          <div>
            <TextField label="Name" name="name" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
