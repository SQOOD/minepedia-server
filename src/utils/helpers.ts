import { PrismaClient } from '@prisma/client'
import { PubSub } from 'apollo-server'
import { sign, verify } from 'jsonwebtoken'
import { MINEPEDIA_APP_SECRET, tokens } from './constants'
import { Context, Token } from '../types'

export const handleError = (error: any) => {
  // add any other logging mechanism here e.g. Sentry
  throw error
}

export const generateAccessToken = (vendorID: number) => {
  const accessToken = sign(
    {
      vendorID,
      type: tokens.access.name,
      timestamp: Date.now(),
    },
    MINEPEDIA_APP_SECRET,
    {
      expiresIn: tokens.access.expiry,
    }
  )

  return accessToken
}
export const generateAccessAdmin = (adminID: string) => {
  const accessToken = sign(
    {
      adminID,
      type: tokens.access.name,
      timestamp: Date.now(),
    },
    MINEPEDIA_APP_SECRET,
    {
      expiresIn: tokens.access.expiry,
    }
  )
  return accessToken
}

export const prisma = new PrismaClient()
const pubsub = new PubSub()

export const createContext = (ctx: any): Context => {
  let vendorID: number
  try {
    let Authorization = ''
    try {
      // for queries and mutations
      Authorization = ctx.req.get('Authorization')
    } catch (e) {
      // specifically for subscriptions as the above will fail
      Authorization = ctx?.connection?.context?.Authorization
    }
    const token = Authorization.replace('Bearer ', '')
    const verifiedToken = verify(token, MINEPEDIA_APP_SECRET) as Token

    if (!verifiedToken.vendorID && verifiedToken.type !== tokens.access.name)
      vendorID = -1
    else vendorID = verifiedToken.vendorID
  } catch (e) {
    vendorID = -1
  }
  return {
    ...ctx,
    prisma,
    pubsub,
    vendorID,
  }
}
