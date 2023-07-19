export const forgotPasswordPath = {
  put: {
    tags: ['Autenticação'],
    summary: 'API para resetar a senha do usuário',
    description: 'Essa rota pode ser executada por **qualquer usuário**',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/forgotPasswordParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {}
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
