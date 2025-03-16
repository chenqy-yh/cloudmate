import http from './request'

export const signIn = (phone: string, password: string) => {
  return http.post<AuthResponse>('/login', {
    phone,
    password,
  })
}
