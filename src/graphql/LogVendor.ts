import { objectType, arg, extendType } from '@nexus/schema'

export const LogVendor = objectType({
  name: 'LogVendor',
  definition(t) {
    t.model.id()
    t.model.admin()
    t.model.adminID()
    t.model.vendor()
    t.model.vendorID()
    t.model.description()
    t.model.contentStatus()
    t.model.createdAt()
  },
})

export const logVendorQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.logVendor()
    t.field('findFirstLogVendor', {
      type: 'LogVendor',
      args: {
        where: 'LogVendorWhereInput',
        orderBy: arg({ type: 'LogVendorOrderByInput', list: true }),
        cursor: 'LogVendorWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.logVendor.findFirst(args)
      },
    })
    t.crud.logVendors({ filtering: true, ordering: true })
    t.field('logVendorsCount', {
      type: 'Int',
      args: {
        where: 'LogVendorWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.logVendor.count(args)
      },
    })
  },
})

export const logVendorMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneLogVendor()
    t.crud.updateOneLogVendor()
    t.crud.upsertOneLogVendor()
    t.crud.deleteOneLogVendor()
    t.crud.updateManyLogVendor()
    t.crud.deleteManyLogVendor()
  },
})
