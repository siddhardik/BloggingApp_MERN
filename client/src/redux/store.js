import {createSlice, configureStore} from "@reduxjs/toolkit";

const authSlice  = createSlice({
    name:'auth',
    initialState:{
        isLogin:false,
    },
    reducers:{
        //We can put multiple reducers
        login(state){
            state.isLogin = true;
        },

        logout(state){
            state.isLogin = false;

        }
    }
})

export const authActions= authSlice.actions;

export const store =configureStore({
    reducer : authSlice.reducer
})

// Learning React redux-toolkit From Coding Ninjas 

