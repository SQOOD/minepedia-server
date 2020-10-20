import { stringArg, extendType } from '@nexus/schema'
import { compare, hash } from 'bcrypt'
import {
  generateAccessToken,
  generateAccessAdmin,
  handleError,
} from '../utils/helpers'
import { errors } from '../utils/constants'

export const user = extendType({
  type: 'Mutation',
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

    t.field('registerAdmin', {
      type: 'AuthPayloadAdmin',
      args: {
        nik: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },
      async resolve(_parent, { nik, password }, ctx) {
        try {
          const hashedPassword = await hash(password, 10)
          const admin = await ctx.prisma.admin.create({
            data: {
              nik,
              password: hashedPassword,
            },
          })

          const accessToken = generateAccessAdmin(admin.id)
          return {
            accessToken,
            admin,
          }
        } catch (e) {
          handleError(errors.userAlreadyExists)
        }
      },
    })

    t.field('loginAdmin', {
      type: 'AuthPayloadAdmin',
      args: {
        nik: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },
      async resolve(_parent, { nik, password }, ctx) {
        let admin = null
        try {
          admin = await ctx.prisma.admin.findOne({
            where: {
              nik,
            },
          })
        } catch (e) {
          handleError(errors.invalidUser)
        }

        if (!admin) handleError(errors.invalidUser)

        const passwordValid = await compare(password, admin.password)
        if (!passwordValid) handleError(errors.invalidUser)

        const accessToken = generateAccessAdmin(admin.id)

        return {
          token: accessToken,
          admin,
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

        if (vendor.approved == false) handleError(errors.waitingForApproval)

        const accessToken = generateAccessToken(vendor.id)

        return {
          token: accessToken,
          vendor,
        }
      },
    })
  },
})
