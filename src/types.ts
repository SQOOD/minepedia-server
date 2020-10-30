import { PrismaClient } from '@prisma/client'
import { PubSub } from 'apollo-server'
import { Request, Response } from 'express'
// import { IncomingMessage } from 'http'

export interface Context {
  prisma: PrismaClient
  req: Request
  res: Response
  pubsub: PubSub
  userID: number
}

// export interface SocketContext {
//   prisma: PrismaClient
//   req: IncomingMessage
//   pubsub: PubSub
// }

export interface Token {
  vendorID: number
  type: string
  timestamp: number
}

export interface TokenAdmin {
  adminID: number
  type: string
  timestamp: number
}

export interface Status {
  approved: string
  assignee?: string
  suggested: string
  note?: string
  rejected?: boolean
}
