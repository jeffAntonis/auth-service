export const env = {
  keycloak: {
    baseUrl: process.env.KEYCLOAK_BASE_URL ?? '',
    realm: process.env.KEYCLOAK_REALM ?? 'master',
    clientId: process.env.KEYCLOAK_CLIENT_ID ?? '',
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET ?? ''
  },
  s3: {
    accessKey: process.env.AWS_ACCESS_KEY_ID ?? '',
    secret: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    bucket: process.env.DEFAULT_PATH_UPLOAD ?? ''
  },
  port: process.env.PORT ?? 5050
}
