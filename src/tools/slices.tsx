import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { Role, type UserDetailDTO, type UserSavingDTO } from './api'

export interface UserState {
  logon: boolean
  detail: UserDetailDTO
  saving: UserSavingDTO
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    logon: false,
    detail: {
      email: '',
      realName: '',
      role: Role.User,
      username: '',
      studentId: '',
      id: 0
    },
    saving: {
      exps: 0,
      coins: 0
    }
  },
  reducers: {
    setLogin (state: UserState) {
      state.logon = true
    },
    setLogout (state: UserState) {
      state.logon = false
    },
    setUserDetail (state: UserState, action: PayloadAction<UserDetailDTO>) {
      state.detail = action.payload
    },
    setUserSaving (state: UserState, action: PayloadAction<UserSavingDTO>) {
      state.saving = action.payload
    }
  }
})

export const { setLogin, setLogout, setUserDetail, setUserSaving } = userSlice.actions
export const userReducer = userSlice.reducer
export const store = configureStore({
  reducer: {
    user: userReducer
  }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const user = (state: RootState) => state.user
export const logon = (state: RootState) => state.user.logon
