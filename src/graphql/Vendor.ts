import { objectType, arg, extendType } from '@nexus/schema'

export const Vendor = objectType({
  name: 'Vendor',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.email()
    t.model.password()
    t.model.npwp()
    t.model.profile()
    t.model.approved()
    t.model.log()
    t.model.LogMerchant()
    t.model.LogProduct()
  },
})

export const vendorQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.vendor()
    t.field('findFirstVendor', {
      type: 'Vendor',
      args: {
        where: 'VendorWhereInput',
        orderBy: arg({ type: 'VendorOrderByInput', list: true }),
        cursor: 'VendorWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.vendor.findFirst(args)
      },
    })
    t.crud.vendors({ filtering: true, ordering: true })
    t.field('vendorsCount', {
      type: 'Int',
      args: {
        where: 'VendorWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.vendor.count(args)
      },
    })
  },
})

export const vendorMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneVendor()
    t.crud.updateOneVendor()
    t.crud.upsertOneVendor()
    t.crud.deleteOneVendor()
    t.crud.updateManyVendor()
    t.crud.deleteManyVendor()
  },
})
