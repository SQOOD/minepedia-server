import * as Auth from './Auth'
import AuthPayloadVendor from './AuthPayload'
import * as Types from './types'

export const resolvers = {
  ...Auth,
  AuthPayloadVendor,
  Types
}
