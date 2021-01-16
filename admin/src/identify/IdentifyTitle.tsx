import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Identify } from "../api/identify/Identify";

type Props = { id: string };

export const IdentifyTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Identify,
    AxiosError,
    [string, string]
  >(["get-/api/identifies", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/identifies"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/identifies"}/${id}`} className="entity-id">
      {data?.qrCode && data?.qrCode.length ? data.qrCode : data?.id}
    </Link>
  );
};
