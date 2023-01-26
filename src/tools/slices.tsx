import { combineReducers, configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { Role, type UserDetailDTO, type UserSavingDTO, type QuestionDetailDTO, type Language, type ProblemType } from './api'

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

const questionToAskSlice = createSlice({
  name: 'questionToAsk',
  initialState: {
    code: '',
    title: '',
    language: 'C' as Language,
    description: '',
    problemType: 'OTHERS' as ProblemType
  },
  reducers: {
    setQuestionToAsk (state: QuestionDetailDTO, action: PayloadAction<QuestionDetailDTO>) {
      state = action.payload
    }
  }
})

export const { setLogin, setLogout, setUserDetail, setUserSaving } = userSlice.actions
export const userReducer = userSlice.reducer
export const { setQuestionToAsk } = questionToAskSlice.actions
export const questionToAskReducer = questionToAskSlice.reducer
const rootReducer = combineReducers({
  user: userReducer,
  questionToAsk: questionToAskReducer
})
const rootPersistConfig = {
  key: 'root',
  storage
}
const persistedReducer = persistReducer(rootPersistConfig, rootReducer)
export const store = configureStore({ reducer: persistedReducer, middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], }, }), });
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const user = (state: RootState) => state.user
export const logon = (state: RootState) => state.user.logon
