import {createSlice} from '@reduxjs/toolkit'
const transactionSlice=createSlice({
    name: 'transactions',
    initialState: {
        userData: {},
        loginUserId: '',
    },
    reducers: {
        getLoginUserId: (state, action)=>{
            state.loginUserId = action.payload
        },
        getUserData: (state, action)=>{
            state.userData = action.payload
        },
    },
})

export const {getLoginUserId, getUserData } = transactionSlice.actions
export default transactionSlice.reducer
