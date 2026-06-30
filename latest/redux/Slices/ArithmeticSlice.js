import { createSlice } from "@reduxjs/toolkit";

export const arithmetics = createSlice({
    name: "Arithmetic Operation",
    initialState: {
        value: 0
    },
    reducers:{
        increment: (state)=>{
            state.value+=1;
        },
        decrement: (state)=>{
            state.value-=1;
        },
        multiply: (state)=>{
            state.value===0 ? 0 :
            state.value*=2;
        },
        divide: (state)=>{
            state.value===0 ? 0 :
            state.value= state.value/2;
        }
    }  
})
export const {increment,decrement,multiply,divide} = arithmetics.actions;
export default arithmetics.reducer;