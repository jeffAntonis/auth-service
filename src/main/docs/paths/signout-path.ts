export const signOutPath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Autenticação'],
    summary: 'API para encerrar sessão do usuário logado',
    description: 'Essa rota pode ser executada por **qualquer usuário**',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                access_token: {
                  type: 'string'
                },
                expires_in: {
                  type: 'string'
                },
                refresh_token: {
                  type: 'string'
                },
                refresh_expires_in: {
                  type: 'string'
                }
              }
            }
          }
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
