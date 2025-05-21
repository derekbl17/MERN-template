import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const createPost=async(postData)=>{
    const {data}=await axios.post('/api/posts',postData);
    return data;
}

export function useCreatePostMutation(){
    return useMutation({
        mutationFn:createPost
    })
}