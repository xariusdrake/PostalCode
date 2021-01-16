import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Identify } from "../api/identify/Identify";

type Data = Identify[];

type Props = Omit<SelectFieldProps, "options">;

export const IdentifySelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/identifies",
    async () => {
      const response = await api.get("/api/identifies");
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
