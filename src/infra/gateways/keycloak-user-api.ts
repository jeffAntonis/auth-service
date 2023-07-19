/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { KeyCloakCreateUser, KeyCloakAuthentication, KeyCloakResetPassword, KeyCloakSignOut } from '@/domain/contracts/gateways'
import { AxiosHttpClient } from '@/infra/gateways'
import * as qs from 'qs'

export class KeyCloakUserApi implements KeyCloakCreateUser, KeyCloakAuthentication, KeyCloakResetPassword, KeyCloakSignOut {
  constructor (
    private readonly httpClient: AxiosHttpClient,
    private readonly baseUrl: string,
    private readonly realm: string,
    private readonly clientId: string,
    private readonly clientSecret: string
  ) { }

  async getToken (): Promise<any> {
    return this.httpClient.post({
      url: `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token`,
      data: qs.stringify({
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  async authentication ({ email, password, totp }: KeyCloakAuthentication.Input): Promise<KeyCloakAuthentication.Output> {
    return this.httpClient.post({
      url: `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token`,
      data: qs.stringify({
        grant_type: 'password',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        username: email,
        password,
        ...((totp != null) && { totp })
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  async create ({ email, firstName, lastName, password }: KeyCloakCreateUser.Input): Promise<KeyCloakCreateUser.Output> {
    const { access_token } = await this.getToken()
    return this.httpClient.post(
      {
        url: `${this.baseUrl}/admin/realms/${this.realm}/users`,
        data: {
          enabled: true,
          email,
          username: email,
          firstName,
          lastName,
          credentials: [
            { type: 'password', value: password, temporary: false }
          ]
        },
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    )
  }

  async resetPassword ({ id }: KeyCloakResetPassword.Input): Promise<any> {
    const { access_token } = await this.getToken()
    return this.httpClient.put(
      {
        url: `${this.baseUrl}/admin/realms/${this.realm}/users/${id}/execute-actions-email`,
        data: ['UPDATE_PASSWORD'],
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    )
  }

  async configureTotp ({ id }: KeyCloakResetPassword.Input): Promise<any> {
    const { access_token } = await this.getToken()
    return this.httpClient.put(
      {
        url: `${this.baseUrl}/admin/realms/${this.realm}/users/${id}/execute-actions-email`,
        data: ['CONFIGURE_TOTP'],
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    )
  }

  async signOut ({ userId }: KeyCloakSignOut.Input): Promise<KeyCloakSignOut.Output> {
    const { access_token } = await this.getToken()
    return this.httpClient.post(
      {
        url: `${this.baseUrl}/admin/realms/${this.realm}/users/${userId}/logout`,
        data: {},
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    )
  }
}
