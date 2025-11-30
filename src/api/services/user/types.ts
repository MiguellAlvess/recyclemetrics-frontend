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
