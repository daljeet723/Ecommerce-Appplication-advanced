// USING REDUX RTK QUERY

// Importing necessary functions from the RTK Query library
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MessageResponse, UserResponse } from '../../types/api-types';
import { User } from '../../types/types';
import axios from 'axios';


// createApi: This function takes an object including reducerPath, baseQuery, and endpoints
export const userApi = createApi({
    // This is a string value that represents unique name for the reducer path
    reducerPath: "userApi",

    // fetchBaseQuery: This function creates a base query function that can be used with RTK Query endpoints
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user` }),

    // endpoints: This is an object where each key represents an API endpoint.
    endpoints: (builder) => ({
        // Defining a 'login' endpoint using builder.mutation
        //Mutations typically correspond to operations that modify data on the server, such as creating or updating resources.
        // return type contain success and message which is defined in api-types.ts file
        login: builder.mutation<MessageResponse, User>({
            // It takes a parameter user, which presumably contains the data to be sent in the request body.
            query: (user) => ({
                // url: This specifies the endpoint relative to the base URL defined earlier (${server}/api/v1/user). 
                //In this case, it's set to "new".
                // api/v1/user/new
                url: "new",
                method: "POST",
                // This specifies the data to be sent in the request body. 
                //In this case, it's set to the user parameter,
                // which presumably contains the user's credentials or other relevant information needed for authentication or login.
                body: user,
            })
        }),

    })
});

//import in app.ts
export const getUser = async (id: string) => {
    try {
        //de-structure data which will define type of data
        //return {data}
        //define types of data. TYpeis userResponse{data: userReponse}
        const { data }: { data: UserResponse } = await axios.get(
            `${import.meta.env.VITE_SERVER}/api/v1/user/${id}`)
        return data

    } catch (error) {
        throw error
    }
}
//@reduxjs/toolkit/query/react will itself create useLoginMutuation
//As we defined "login" endpoint at line 23
//Use useApi in store.ts
export const { useLoginMutation } = userApi
