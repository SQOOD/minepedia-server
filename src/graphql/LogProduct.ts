import { objectType, arg, extendType } from '@nexus/schema'

export const LogProduct = objectType({
  name: 'LogProduct',
  definition(t) {
    t.model.id()
    t.model.admin()
    t.model.adminID()
    t.model.product()
    t.model.productID()
    t.model.description()
    t.model.contentStatus()
    t.model.createdAt()
    t.model.Product()
    t.model.productId()
  },
})

export const logProductQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.logProduct()
    t.field('findFirstLogProduct', {
      type: 'LogProduct',
      args: {
        where: 'LogProductWhereInput',
        orderBy: arg({ type: 'LogProductOrderByInput', list: true }),
        cursor: 'LogProductWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.logProduct.findFirst(args)
      },
    })
    t.crud.logProducts({ filtering: true, ordering: true })
    t.field('logProductsCount', {
      type: 'Int',
      args: {
        where: 'LogProductWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.logProduct.count(args)
      },
    })
  },
})

export const logProductMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneLogProduct()
    t.crud.updateOneLogProduct()
    t.crud.upsertOneLogProduct()
    t.crud.deleteOneLogProduct()
    t.crud.updateManyLogProduct()
    t.crud.deleteManyLogProduct()
  },
})
