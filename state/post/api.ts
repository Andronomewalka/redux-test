import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { nanoid } from "nanoid";
import { Post } from './types'

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
	tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], number>({ 
      query: (limit: number = 50) => ({
        url: '/posts',
				method: "GET",
				params: {
					_limit: limit
				}
    	}),
			providesTags: () => ['Post']
		}),
		createPost: builder.mutation<Post, Post>({
			query: (post) => ({
				url: `/posts`,
				method: "POST",
				body: {...post, id: nanoid()}
			}),
			async onQueryStarted(args) {
				console.log(args)
			},
			invalidatesTags: ['Post']
		}),
		updatePost: builder.mutation<Post, Post>({
			query: (post) => ({
				url: `/posts`,
				method: "PUT",
				body: post
			}),
			invalidatesTags: ['Post']
		}),
		deletePost: builder.mutation<Post, Post>({
			query: (post) => ({
				url: `/posts/${post.id}`,
				method: "DELETE",
				body: post
			}),
			invalidatesTags: ['Post']
		})
	})
});

export const { 
	useGetPostsQuery, 
	useCreatePostMutation,
	useUpdatePostMutation,
	useDeletePostMutation 
} = postApi