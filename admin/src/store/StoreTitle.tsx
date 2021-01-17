import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Store } from "../api/store/Store";

type Props = { id: string };

export const StoreTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Store,
    AxiosError,
    [string, string]
  >(["get-/api/stores", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/stores"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/stores"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
