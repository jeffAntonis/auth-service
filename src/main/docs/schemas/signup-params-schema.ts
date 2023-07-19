export const signUpParamsSchema = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    passwordConfirmation: {
      type: 'string'
    },
    documentType: {
      type: 'string'
    },
    document: {
      type: 'string'
    },
    enableSecondAuthenticationFactor: {
      type: 'boolean'
    }
  },
  required: ['name', 'email', 'password', 'passwordConfirmation', 'documentType', 'document']
}
