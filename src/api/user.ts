/*
 * @Author: wangao
 * @Date: 2025-02-25 20:31:42
 * @LastEditTime: 2025-02-25 21:02:16
 * @LastEditors: wangao
 * @Description:
 * @FilePath: /vue3-vant-mobile/src/api/user.ts
 */
import request from '@/utils/request'

export interface LoginData {
  email: string
  password: string
}

export interface LoginRes {
  token: string
}

export interface UserState {
  uid?: number
  name?: string
  avatar?: string
}

export function login(data: LoginData): Promise<any> {
  return request.post<LoginRes>('/auth/login', data)
}

export function logout() {
  return request.post('/user/logout')
}

export function getUserInfo() {
  return request<UserState>('/user/me')
}

export function getEmailCode(): Promise<any> {
  return request.get('/user/email-code')
}

export function resetPassword(): Promise<any> {
  return request.post('/user/reset-password')
}

export function register(): Promise<any> {
  return request.post('/user/register')
}

export function userList(params): Promise<any> {
  return request.post('/course/list', params)
}

export function userSearch(params: any) {
  return request.post('/course/search', params)
}
