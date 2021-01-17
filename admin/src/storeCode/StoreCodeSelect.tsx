import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { StoreCode } from "../api/storeCode/StoreCode";

type Data = StoreCode[];

type Props = Omit<SelectFieldProps, "options">;

export const StoreCodeSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/store-codes",
    async () => {
      const response = await api.get("/api/store-codes");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.qrCode && item.qrCode.length ? item.qrCode : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
