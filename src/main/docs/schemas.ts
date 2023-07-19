import {
  signinParamsSchema,
  signUpParamsSchema,
  forgotPasswordParamsSchema,
  errorSchema
} from './schemas/'

export default {
  signinParams: signinParamsSchema,
  signUpParams: signUpParamsSchema,
  forgotPasswordParams: forgotPasswordParamsSchema,
  error: errorSchema
}
