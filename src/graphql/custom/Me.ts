import { extendType, stringArg } from '@nexus/schema'
import jwt_decode from 'jwt-decode'
import { Token, TokenAdmin } from '../../types'

export const Me = extendType({
  type: 'Query',
  definition(t) {
    t.field('currentVendor', {
      type: 'Vendor',
      args: {
        token: stringArg({ required: true }),
      },
      resolve: async (_, { token }, ctx) => {
        const jwt: Token = jwt_decode(token)

        const vendor = await ctx.prisma.vendor.findOne({
          where: { id: jwt.vendorID },
        })

        return vendor
      },
    })
    t.field('currentAdmin', {
      type: 'Admin',
      args: {
        token: stringArg({ required: true }),
      },
      resolve: async (_, { token }, ctx) => {
        const jwt: TokenAdmin = jwt_decode(token)

        const admin = await ctx.prisma.admin.findOne({
          where: { id: jwt.adminID.toString() },
        })

        return admin
      },
    })
  },
})
