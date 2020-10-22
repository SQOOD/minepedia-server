import { config } from 'dotenv'
config()

import { ApolloServer } from 'apollo-server'
import { applyMiddleware } from 'graphql-middleware'
// import { permissions } from './utils/rules'
import { schema } from './schema'
import { isDev } from './utils/constants'
import { createContext } from './utils/helpers'

export const server = new ApolloServer({
  schema: applyMiddleware(schema),
  // schema: applyMiddleware(schema, permissions),
  context: createContext,
  playground: false,
  tracing: isDev(),
  introspection: true,
  debug: isDev(),
  cors: {
    credentials: true,
    origin: '*',
  },
  uploads: {
    maxFiles: 6,
  },
  // subscriptions: {
  //   onConnect: (_connectionParams, _websocket, connContext): SocketContext => {
  //     return {
  //       req: connContext.request,
  //       prisma,
  //       pubsub,
  //     }
  //   },
  // },
})
