import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const getCategories = async () => {
  const { data } = await axios.get("/api/categories");
  return data; // expected to be an array of { _id, name }
};

export function useCategoriesQuery() {
    return useQuery({
      queryKey: ["categories"],
      queryFn: getCategories,
    });
  }