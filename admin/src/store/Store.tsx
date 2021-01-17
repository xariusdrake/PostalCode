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
import { Store as TStore } from "../api/store/Store";
import { StoreUpdateInput } from "../api/store/StoreUpdateInput";

export const Store = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/stores/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TStore,
    AxiosError,
    [string, string]
  >(["get-/api/stores", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/stores"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TStore, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/stores"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//stores");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TStore, AxiosError, StoreUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/stores"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: StoreUpdateInput) => {
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
    () => pick(data, ["address", "creatorId", "geoLocation", "name"]),
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
                title={`${"Store"} ${
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
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
