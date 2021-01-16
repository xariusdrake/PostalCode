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
import { Identify as TIdentify } from "../api/identify/Identify";
import { IdentifyUpdateInput } from "../api/identify/IdentifyUpdateInput";

export const Identify = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/identifies/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TIdentify,
    AxiosError,
    [string, string]
  >(["get-/api/identifies", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/identifies"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TIdentify, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/identifies"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//identifies");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TIdentify, AxiosError, IdentifyUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/identifies"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: IdentifyUpdateInput) => {
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

  const initialValues = React.useMemo(() => pick(data, ["qrCode"]), [data]);

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
                title={`${"Identify"} ${
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
              <TextField label="QR Code" name="qrCode" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
