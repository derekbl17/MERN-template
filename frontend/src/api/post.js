import { Mutation, QueryClient, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../context/authContext";



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

export function useGetMyPostsQuery(){
  return useQuery({
    queryKey:['myPosts'],
    queryFn: async()=> {
      const data = axios.get('/api/posts/my-posts')
      return data;
    }
  })
}


export function useBlockedPostsQuery(){
  return useQuery({
      queryKey:['blockedPosts'],
      queryFn: async()=> axios.get('/api/posts/blocked')
  })
}


export function useLikedPostsQuery(){
    return useQuery({
        queryKey:['likedPosts'],
        queryFn: async()=> axios.get('/api/posts/liked')
    })
}

export function useLikePostMutation() {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    
  
    return useMutation({
      mutationFn: async (postId) => {
        const response = await axios.patch(`/api/posts/${postId}/like`);
        return {
          postId,
          ...response.data, // includes updated likes array and isLiked
        };
      },
  
  
      onError: (err, postId, context) => {
        toast.error(err.response?.data?.message || 'Like action failed');
      },
  
      onSuccess: (data) => {
        queryClient.setQueryData(['posts'], (oldPosts) => {
          if (!oldPosts || !oldPosts.data) return oldPosts;
  
          return {
            ...oldPosts,
            data: oldPosts.data.map((post) => {
              if (post._id === data.postId) {
                return {
                  ...post,
                  likes: data.likes, // Use updated likes array from server
                };
              }
              return post;
            }),
          };
        });
        queryClient.setQueryData(['likedPosts'], (old) => {
          if (!old) return old;
          const stillLiked = data.likes.includes(user._id);
  
          return {
            ...old,
            data: stillLiked
              ? old.data.map((post) =>
                  post._id === data.postId
                    ? { ...post, likes: data.likes }
                    : post
                )
              : old.data.filter((post) => post._id !== data.postId),
          };
        });
      },
    });
  }

export function useEditPostMutation(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async(postData)=>{
      const {data}=await axios.put(`/api/posts/${postData.postId}`,postData);
      return data
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(['posts'])
    }
  })
}

export function useDeletePostMutation(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async(postId)=>{
      const {data}=await axios.delete(`/api/posts/${postId}`);
      return data
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(['posts'])
    }
  })
}

export function useModeratePostMutation(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async(postId)=>{
      const {data}=await axios.patch(`/api/posts/${postId}`);
      return data
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(['posts'])
    }
  })
}