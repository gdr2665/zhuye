import { combineReducers, configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {
  type QuestionDetailDTO,
  Role,
  SolutionDetailDTO,
  type UserDetailDTO,
  type UserSavingDTO,
} from './api'

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
      id: 0,
    },
    saving: {
      exps: 0,
      coins: 0,
    },
  },
  reducers: {
    setLogin(state: UserState) {
      state.logon = true
    },
    setLogout(state: UserState) {
      state.logon = false
    },
    setUserDetail(state: UserState, action: PayloadAction<UserDetailDTO>) {
      state.detail = action.payload
    },
    setUserSaving(state: UserState, action: PayloadAction<UserSavingDTO>) {
      state.saving = action.payload
    },
  },
})

const initialQTA: QuestionDetailDTO = {
  code: '',
  title: '',
  language: 'C',
  description: '',
  problemType: 'OTHER',
  reward: null,
}

export interface QTAState {
  data: QuestionDetailDTO
}

const questionToAskSlice = createSlice({
  name: 'questionToAsk',
  initialState: {
    data: initialQTA,
  },
  reducers: {
    setQuestionToAsk(state: QTAState, action: PayloadAction<QuestionDetailDTO>) {
      state.data = action.payload
    },
  },
})

const initialSTA: SolutionDetailDTO = {
  accepted: false,
  annotations: '',
  likeCount: 0,
}

export interface STAState {
  data: SolutionDetailDTO
  tempCode: string
}

const solutionToAnswerSlice = createSlice({
  name: 'solutionToAnswer',
  initialState: {
    data: initialSTA,
    tempCode: '',
  },
  reducers: {
    setSolutionToAnswer(state: STAState, action: PayloadAction<SolutionDetailDTO>) {
      state.data = action.payload
    },
    setSTATempCode(state: STAState, action: PayloadAction<string>) {
      state.tempCode = action.payload
    },
  },
})

export const { setLogin, setLogout, setUserDetail, setUserSaving } = userSlice.actions
export const userReducer = userSlice.reducer
export const { setQuestionToAsk } = questionToAskSlice.actions
export const questionToAskReducer = questionToAskSlice.reducer
export const { setSolutionToAnswer, setSTATempCode } = solutionToAnswerSlice.actions
export const solutionToAnswerReducer = solutionToAnswerSlice.reducer
const rootReducer = combineReducers({
  user: userReducer,
  questionToAsk: questionToAskReducer,
  solutionToAnswer: solutionToAnswerReducer,
})
const rootPersistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(rootPersistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
    }),
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const user = (state: RootState) => state.user
export const logon = (state: RootState) => state.user.logon
