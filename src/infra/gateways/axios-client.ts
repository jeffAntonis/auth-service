import { HttpGetClient, HttpPostClient, HttpPutClient } from '@/infra/gateways'

import axios from 'axios'

export class AxiosHttpClient implements HttpGetClient, HttpPostClient, HttpPutClient {
  async get({ url, params }: HttpGetClient.Input): Promise<any> {
    const result = await axios.get(url, { ...params });
    return result.data;
  }

  async post({ url, data, headers }: HttpPostClient.Input): Promise<any> {
    const result = await axios.post(url, data, { headers: { ...headers } });
    return result.data;
  }

  async put({ url, data, headers }: HttpPutClient.Input): Promise<any> {
    const result = await axios.put(url, data, { headers: { ...headers } });
    return result.data;
  }

  async delete({ url, data, headers }: HttpPutClient.Input): Promise<any> {
    const result = await axios.delete(url, {
      data,
      headers: { ...headers },
    });
    return result.data;
  }
}
