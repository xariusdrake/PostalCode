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
import { Identify } from "../api/identify/Identify";
import { IdentifyCreateInput } from "../api/identify/IdentifyCreateInput";

const INITIAL_VALUES = {} as IdentifyCreateInput;

export const CreateIdentify = (): React.ReactElement => {
  useBreadcrumbs("/identifies/new", "Create Identify");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Identify,
    AxiosError,
    IdentifyCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/identifies", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/identifies"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: IdentifyCreateInput) => {
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
            <FormHeader title={"Create Identify"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="QR Code" name="qrCode" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
