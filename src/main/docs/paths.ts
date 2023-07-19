import {
  signPath,
  signUpPath,
  signOutPath,
  forgotPasswordPath
} from './paths/'

export default {
  '/auth/signin': signPath,
  '/auth/signup': signUpPath,
  '/auth/signout': signOutPath,
  '/auth/forgot-password': forgotPasswordPath
}
