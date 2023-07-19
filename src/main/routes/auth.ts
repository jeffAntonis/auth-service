import { Router } from 'express'
import { adaptExpressRoute as adapt } from '@/main/adapters'
import {
  makeSignUpController,
  makeSignInController,
  makeForgotPasswordController,
  makeSignOutController
} from '@/main/factories/application/controllers'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/auth/signup', adapt(makeSignUpController()))
  router.post('/auth/signin', adapt(makeSignInController()))
  router.post('/auth/signout', auth, adapt(makeSignOutController()))
  router.put('/auth/forgot-password', adapt(makeForgotPasswordController()))
}
