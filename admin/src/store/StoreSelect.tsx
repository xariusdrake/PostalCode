import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Store } from "../api/store/Store";

type Data = Store[];

type Props = Omit<SelectFieldProps, "options">;

export const StoreSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/stores",
    async () => {
      const response = await api.get("/api/stores");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.name && item.name.length ? item.name : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
