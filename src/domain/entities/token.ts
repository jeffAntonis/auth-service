export interface Token {
  iat?: string
  exp?: number
  sub: string
  sid: string
  resource_access?: object
  email_verified?: boolean
  name: string
  given_name?: string
  family_name?: string
  email: string
  preferred_username?: string
}
