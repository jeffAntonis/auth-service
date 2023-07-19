export interface HttpGetClient {
  get: <T = any> (input: HttpGetClient.Input) => Promise<T>
}

export namespace HttpGetClient {
  export type Input = {
    url: string
    params: object
  }
}

export interface HttpPostClient {
  post: <T = any> (input: HttpPostClient.Input) => Promise<T>
}

export namespace HttpPostClient {
  export type Input = {
    url: string
    data: any
    headers?: object
  }
}

export interface HttpPutClient {
  put: <T = any> (input: HttpPutClient.Input) => Promise<T>
}

export namespace HttpPutClient {
  export type Input = {
    url: string
    data: any
    headers?: object
  }
}
