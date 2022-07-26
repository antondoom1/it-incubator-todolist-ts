import {Dispatch} from 'redux'
import {setAppStatusAC} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from '../../api/todolists-api'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {clearTodosDataAC} from '../TodolistsList/todolists-reducer'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn
    }
  }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  authAPI.login(data)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({isLoggedIn: true}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  authAPI.logout()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({isLoggedIn: true}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
        dispatch(clearTodosDataAC())
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}