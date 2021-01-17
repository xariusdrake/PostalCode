import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { StoreCode } from "../api/storeCode/StoreCode";

type Props = { id: string };

export const StoreCodeTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    StoreCode,
    AxiosError,
    [string, string]
  >(["get-/api/store-codes", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/store-codes"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/store-codes"}/${id}`} className="entity-id">
      {data?.qrCode && data?.qrCode.length ? data.qrCode : data?.id}
    </Link>
  );
};
