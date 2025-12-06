export type SignupInput = {
  name: string
  email: string
  password: string
}

export type LoginInput = {
  email: string
  password: string
}

export type UpdateUserInput = {
  name?: string
  email?: string
  password?: string
}

export type UpdateUserResponse = {
  userId: number
  name: string
  email: string
}

export type AuthResponse = {
  accessToken: string
  expiresIn: number
  user: {
    userId: number
    name: string
    email: string
  }
}

export type User = {
  userId: number
  name: string
  email: string
}
