import { User } from '@/domain/entities'

// CREATE USER
export interface KeyCloakCreateUser {
  create: (user: KeyCloakCreateUser.Input) => Promise<KeyCloakCreateUser.Output>
}

export namespace KeyCloakCreateUser {
  export type Input = User
  export type Output = any
}

// AUTHENTICATION
export interface KeyCloakAuthentication {
  authentication: (input: KeyCloakAuthentication.Input) => Promise<KeyCloakAuthentication.Output>
}

export namespace KeyCloakAuthentication {
  export type Input = { email: string, password: string, totp?: string }
  export type Output = any
}

// RESET PASSWORD
export interface KeyCloakResetPassword {
  resetPassword: (input: KeyCloakResetPassword.Input) => Promise<KeyCloakResetPassword.Output>
}

export namespace KeyCloakResetPassword {
  export type Input = { id: string }
  export type Output = any
}

// CONFIGURE TOTP
export interface KeyCloakConfigureTotp {
  configureTotp: (input: KeyCloakConfigureTotp.Input) => Promise<KeyCloakConfigureTotp.Output>
}

export namespace KeyCloakConfigureTotp {
  export type Input = { id: string }
  export type Output = any
}

// SIGNOUT
export interface KeyCloakSignOut {
  signOut: (input: KeyCloakSignOut.Input) => Promise<KeyCloakSignOut.Output>
}

export namespace KeyCloakSignOut {
  export type Input = { userId: string }
  export type Output = any
}
