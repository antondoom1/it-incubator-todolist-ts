import {Dispatch} from 'redux'
import {authAPI} from '../api/todolists-api'
import {setIsLoggedInAC} from '../features/Login/auth-reducer'
import {handleServerNetworkError} from '../utils/error-utils'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState: InitialStateType = {
  isInitialized: false,
  status: 'idle',
  error: null
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    setIsInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized
    }
  }
})

export const appReducer = slice.reducer
export const {setAppErrorAC, setAppStatusAC, setIsInitializedAC} = slice.actions

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
  isInitialized: boolean
  // происходит ли сейчас взаимодействие с сервером
  status: RequestStatusType
  // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
  error: string | null
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then(res => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({isLoggedIn: true}))
      dispatch(setAppStatusAC({status: 'succeeded'}))
    }
  })
    .catch(error => handleServerNetworkError(error, dispatch))
    .finally(() => dispatch(setIsInitializedAC({isInitialized: true})))
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>