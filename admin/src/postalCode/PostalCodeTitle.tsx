import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { PostalCode } from "../api/postalCode/PostalCode";

type Props = { id: string };

export const PostalCodeTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    PostalCode,
    AxiosError,
    [string, string]
  >(["get-/api/postal-codes", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/postal-codes"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/postal-codes"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
