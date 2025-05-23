import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCreateCategoryMutation(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:async(categoryData)=>{
      const {data}=await axios.post('/api/categories',{
        name:categoryData.name
      });
      return data
    },
    onSuccess:(data)=>{
      queryClient.setQueryData(['categories'],(old)=>[...old,data])
    }
  })
}

export function useCategoriesQuery() {
    return useQuery({
      queryKey: ["categories"],
      queryFn: async()=> {
         const {data}=await axios.get("/api/categories");
          return data
        }
    });
};

export function useDeleteCategoryMutation(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:async(categoryId)=>{
      await axios.delete(`/api/categories/${categoryId}`)
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(['categories'])
    }
  })
}
