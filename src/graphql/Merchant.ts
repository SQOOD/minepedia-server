import { objectType, arg, extendType } from '@nexus/schema'

export const Merchant = objectType({
  name: 'Merchant',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.email()
    t.model.password()
    t.model.npwp()
    t.model.profile()
    t.model.approved()
    t.model.log()
  },
})

export const merchantQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.merchant()
    t.field('findFirstMerchant', {
      type: 'Merchant',
      args: {
        where: 'MerchantWhereInput',
        orderBy: arg({ type: 'MerchantOrderByInput', list: true }),
        cursor: 'MerchantWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.merchant.findFirst(args)
      },
    })
    t.crud.merchants({ filtering: true, ordering: true })
    t.field('merchantsCount', {
      type: 'Int',
      args: {
        where: 'MerchantWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.merchant.count(args)
      },
    })
  },
})

export const merchantMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneMerchant()
    t.crud.updateOneMerchant()
    t.crud.upsertOneMerchant()
    t.crud.deleteOneMerchant()
    t.crud.updateManyMerchant()
    t.crud.deleteManyMerchant()
  },
})
