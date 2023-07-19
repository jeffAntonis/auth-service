export const forgotPasswordParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    }
  },
  required: ['email']
}
