export interface Decode {
  decode: (input: Decode.Input) => Promise<Decode.Output>
}

export namespace Decode {
  export type Input = { accessToken: string }
  export type Output = any
}
