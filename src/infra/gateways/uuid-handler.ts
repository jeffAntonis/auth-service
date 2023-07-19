/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { UUIDGenerator } from '@/domain/contracts/gateways'

import { v4 } from 'uuid'

export class UUIDHandler implements UUIDGenerator {
  uuid ({ key }: UUIDGenerator.Input): UUIDGenerator.Output {
    if (key !== undefined) {
      return `${key}_${v4()}`
    } else {
      return `${v4()}`
    }
  }
}
