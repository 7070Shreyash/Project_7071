import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    mode : "light",
    token : null,
    ques : [],
};

export const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setMode : (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin : (state,action) => {
            state.user = action.payload.user;
            state.token = action.payload.user;
        },
        setLogout : (state) => {
            state.user = null;
            state.token = null;
            state.ques = [];
        },
        setFriends : (state,action) => {
            if(state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("user is non existent");
            }
        },
        setQues : (state,action) => {
            state.ques = action.payload.ques;
        },
        updateQues : (state,action) => {
            const updatedQues = state.ques.map((ques) => {
                if(ques._id === action.payload.ques._id) {
                    return action.payload.ques;
                }
                return ques;
            });
            state.ques = updatedQues;
        },
    },
});

export const {setMode , setLogin , setFriends , setLogout , setQues, updateQues} = authSlice.actions;

export default authSlice.reducer;