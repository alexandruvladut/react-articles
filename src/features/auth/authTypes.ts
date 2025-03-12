export interface User {
  id: string
  username: string
  email: string
}

export interface AuthState {
  user: User | null
  token: string | null
}

export interface LoginResponse {
  user: User
  token: string
}

export interface RegisterResponse {
  message: string
}
