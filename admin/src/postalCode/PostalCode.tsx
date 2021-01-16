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
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { PostalCode as TPostalCode } from "../api/postalCode/PostalCode";
import { PostalCodeUpdateInput } from "../api/postalCode/PostalCodeUpdateInput";

export const PostalCode = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/postal-codes/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TPostalCode,
    AxiosError,
    [string, string]
  >(["get-/api/postal-codes", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/postal-codes"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TPostalCode, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/postal-codes"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//postal-codes");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TPostalCode, AxiosError, PostalCodeUpdateInput>(
    async (data) => {
      const response = await api.patch(`${"/api/postal-codes"}/${id}`, data);
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: PostalCodeUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.name);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["email", "name", "websiteUrl"]),
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
                title={`${"PostalCode"} ${
                  data?.name && data?.name.length ? data.name : data?.id
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
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
