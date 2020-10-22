import { AuthenticationError, UserInputError } from 'apollo-server'
import * as Minio from 'minio'

export const tokens = {
  access: {
    name: 'token',
    expiry: '1d',
  },
}

export const APP_SECRET = process.env.MINEPEDIA_APPSECRET

export const isDev = () => process.env.NODE_ENV === 'development'

export const errors = {
  notAuthenticated: new AuthenticationError('Unauthenticated user!'),
  userAlreadyExists: new UserInputError('User already exists!'),
  invalidUser: new UserInputError('Invalid username or password.'),
  waitingForApproval: new UserInputError('User not yet approved by admins.'),
}

export const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT
    ? process.env.MINIO_ENDPOINT
    : 'localhost',
  port: parseInt(process.env.MINIO_PORT)
    ? parseInt(process.env.MINIO_PORT)
    : 9000,
  useSSL: process.env.MINIO_HTTPS ? true : false,
  accessKey: process.env.MINIO_ACCESS_KEY
    ? process.env.MINIO_ACCESS_KEY
    : 'changeme',
  secretKey: process.env.MINIO_SECRET_KEY
    ? process.env.MINIO_SECRET_KEY
    : 'changemeAgain',
})
