export const signinParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    totp: {
      type: 'string'
    }
  },
  required: ['email', 'password']
}
