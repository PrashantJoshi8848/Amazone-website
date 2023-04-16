import React from "react";
import { useQuery } from "@tanstack/react-query";

const Recomendation = (category, id) => {
  const {
    isLoading,
    error,
    data: productdata,
  } = useQuery(
    {
      queryKey: ["Productdata"],
      queryFn: () =>
        fetch(
          `http://localhost:5000/api/v1/nfts/recommendation/product?categories=${category}&&id=${id}`
        )
          .then((res) => res.json())
          .then((res) => res),
    },
    {
      enabled: !!category && !!id && true,
    }
  );
  console.log(productdata);
};

export default Recomendation;
