import { objectType, arg, extendType } from '@nexus/schema'

export const LogMerchant = objectType({
  name: 'LogMerchant',
  definition(t) {
    t.model.id()
    t.model.admin()
    t.model.adminID()
    t.model.merchant()
    t.model.merchantID()
    t.model.description()
    t.model.contentStatus()
    t.model.createdAt()
    t.model.Merchant()
    t.model.merchantId()
  },
})

export const logMerchantQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.logMerchant()
    t.field('findFirstLogMerchant', {
      type: 'LogMerchant',
      args: {
        where: 'LogMerchantWhereInput',
        orderBy: arg({ type: 'LogMerchantOrderByInput', list: true }),
        cursor: 'LogMerchantWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.logMerchant.findFirst(args)
      },
    })
    t.crud.logMerchants({ filtering: true, ordering: true })
    t.field('logMerchantsCount', {
      type: 'Int',
      args: {
        where: 'LogMerchantWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.logMerchant.count(args)
      },
    })
  },
})

export const logMerchantMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneLogMerchant()
    t.crud.updateOneLogMerchant()
    t.crud.upsertOneLogMerchant()
    t.crud.deleteOneLogMerchant()
    t.crud.updateManyLogMerchant()
    t.crud.deleteManyLogMerchant()
  },
})
