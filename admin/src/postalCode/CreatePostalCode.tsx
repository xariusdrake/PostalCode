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
import { PostalCode } from "../api/postalCode/PostalCode";
import { PostalCodeCreateInput } from "../api/postalCode/PostalCodeCreateInput";

const INITIAL_VALUES = {} as PostalCodeCreateInput;

export const CreatePostalCode = (): React.ReactElement => {
  useBreadcrumbs("/postal-codes/new", "Create PostalCode");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    PostalCode,
    AxiosError,
    PostalCodeCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/postal-codes", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/postal-codes"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: PostalCodeCreateInput) => {
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
            <FormHeader title={"Create PostalCode"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField type="email" label="Email" name="email" />
          </div>
          <div>
            <TextField label="Name" name="name" />
          </div>
          <div>
            <TextField label="Website URL" name="websiteUrl" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
