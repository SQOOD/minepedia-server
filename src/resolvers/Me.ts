import { extendType, stringArg } from '@nexus/schema'
import jwt_decode from 'jwt-decode'

export const Me = extendType({
  type: 'Query',
  definition(t) {
    t.field('currentVendor', {
      type: 'Vendor',
      args: {
        token: stringArg({ required: true }),
      },
      resolve: async (_, { token }, ctx) => {
        const jwt = jwt_decode(token)

        const vendor = await ctx.prisma.vendor.findOne({
          where: { id: jwt.vendorId },
        })

        return vendor
      },
    })
  },
})
