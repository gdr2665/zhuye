// To parse this data:
//
//   import { Convert, QuestionDetailDTO } from "./tools/apifox";
//
//   const questionDetailDTO = Convert.toQuestionDetailDTO(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

import axios, { type AxiosError, type AxiosResponse } from 'axios'
import { MessagePlugin } from 'tdesign-react'

export const Axios = axios.create({
  baseURL: import.meta.env.PROD ? 'https://tc.yxzl.top/api' : '/api'
})

Axios.interceptors.response.use((response: AxiosResponse) => response,
  async (error: AxiosError<InvalidFieldsResponse | InvalidMessageResponse>) => {
    if (!error.response) {
      throw error.message
    }
    const errData = error.response.data
    if ('message' in errData) {
      await MessagePlugin.error(errData.message ?? error.message)
      throw errData
    }
    throw errData as InvalidFieldsResponse
  })

/**
 * QuestionDetailDTO，提问详细信息
 */
export interface QuestionDetailDTO {
  /**
   * 代码
   */
  code: string
  /**
   * 提问创建时间
   */
  createTime?: Date
  /**
   * 描述
   */
  description: string
  /**
   * ID
   */
  id?: number
  /**
   * 语言
   */
  language: Language
  /**
   * 问题类型
   */
  problemType: ProblemType
  /**
   * 悬赏，不设置为null
   */
  reward?: number | null
  /**
   * 是否已解决
   */
  solved?: boolean
  /**
   * 标题
   */
  title: string
  user?: UserBriefInfoDTO
}

/**
 * 语言
 */
export type Language = 'C' | 'CPP' | 'PYTHON' | 'JAVA'

/**
 * 问题类型
 */
export type ProblemType = 'LOCATION_KNOWN' | 'LOCATION_UNKNOWN' | 'OTHER'

/**
 * UserBriefInfoDTO，用户简单信息
 */
export interface UserBriefInfoDTO {
  /**
   * ID
   */
  id?: number
  /**
   * 真实姓名
   */
  realName?: string
  /**
   * 角色
   */
  role?: Role
  /**
   * 用户名
   */
  username?: string
}

export interface UserDetailDTO {
  /**
   * 邮箱
   */
  email: string
  /**
   * ID
   */
  id?: number
  /**
   * 真实姓名
   */
  realName: string
  /**
   * 角色
   */
  role: Role
  /**
   * 学号
   */
  studentId?: null | string
  /**
   * 用户名
   */
  username: string
}

/**
 * 角色
 */
export enum Role {
  Admin = 'ADMIN',
  Teacher = 'TEACHER',
  User = 'USER',
}

export interface UserLoginDTO {
  /**
   * 密码
   */
  password: string
  /**
   * 用户名
   */
  username: string
}

export interface UserSavingDTO {
  /**
   * 金币数
   */
  coins?: number
  /**
   * 经验数
   */
  exps?: number
}

export interface DataIdResponse {
  /**
   * 数据ID
   */
  id: number
}

export interface DataMessageResponse {
  /**
   * 响应字符串
   */
  data?: string
}

export interface InvalidMessageResponse {
  /**
   * 响应文本
   */
  message?: string
}

export interface InvalidFieldsResponse {
  /**
   * 非法字段数量
   */
  count?: number
  /**
   * 字段名及对应的错误提示
   */
  invalidFields?: Record<string, string>
}
