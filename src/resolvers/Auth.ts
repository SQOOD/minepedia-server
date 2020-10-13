import { stringArg, extendType } from '@nexus/schema'
import { compare, hash } from 'bcrypt'
import { generateAccessToken, handleError } from '../utils/helpers'
import { errors } from '../utils/constants'

export const user = extendType({
  type: 'AuthPayloadVendor',
  definition(t) {
    t.field('registerVendor', {
      type: 'AuthPayloadVendor',
      args: {
        email: stringArg({ required: true }),
        npwp: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },
      async resolve(_parent, { npwp, email, password }, ctx) {
        try {
          const hashedPassword = await hash(password, 10)
          const vendor = await ctx.prisma.vendor.create({
            data: {
              npwp,
              email,
              password: hashedPassword,
            },
          })

          const accessToken = generateAccessToken(vendor.id)
          return {
            accessToken,
            vendor,
          }
        } catch (e) {
          handleError(errors.userAlreadyExists)
        }
      },
    })

    t.field('loginVendor', {
      type: 'AuthPayloadVendor',
      args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },
      async resolve(_parent, { email, password }, ctx) {
        let vendor = null
        try {
          vendor = await ctx.prisma.vendor.findOne({
            where: {
              email,
            },
          })
        } catch (e) {
          handleError(errors.invalidUser)
        }

        if (!vendor) handleError(errors.invalidUser)

        const passwordValid = await compare(password, vendor.password)
        if (!passwordValid) handleError(errors.invalidUser)

        const accessToken = generateAccessToken(vendor.id)

        return {
          token: accessToken,
          vendor,
        }
      },
    })
  },
})
