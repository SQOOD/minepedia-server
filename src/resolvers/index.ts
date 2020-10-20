import * as Auth from './Auth'
import { AuthPayloadVendor, AuthPayloadAdmin } from './AuthPayload'
import * as Types from './types'
import * as Files from './Files'
import * as FileUpload from './FileUpload'

export const resolvers = {
  Auth,
  AuthPayloadVendor,
  AuthPayloadAdmin,
  Files,
  Types,
  FileUpload,
}
