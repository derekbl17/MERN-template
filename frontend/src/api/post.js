import { useMutation, useQuery } from "@tanstack/react-query";
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

export const getActivePosts=async()=>{
    const data=await axios.get('/api/posts/active');
    return data;
}

export function usePostsQuery(){
    return useQuery({
        queryKey:['posts'],
        queryFn: getActivePosts,
    })
}