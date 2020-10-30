import { objectType, arg, extendType } from '@nexus/schema'

export const Product = objectType({
  name: 'Product',
  definition(t) {
    t.model.id()
    t.model.productID()
    t.model.name()
    t.model.profile()
    t.model.profileID()
    t.model.unit()
    t.model.tkdn()
    t.model.certificate()
    t.model.category()
    t.model.hscode()
    t.model.minPurchase()
    t.model.country()
    t.model.description()
    t.model.price()
    t.model.customizable()
    t.model.details()
    t.model.approved()
    t.model.log()
    t.model.createdAt()
  },
})

export const productQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.product()
    t.field('findFirstProduct', {
      type: 'Product',
      args: {
        where: 'ProductWhereInput',
        orderBy: arg({ type: 'ProductOrderByInput', list: true }),
        cursor: 'ProductWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.product.findFirst(args)
      },
    })
    t.crud.products({ filtering: true, ordering: true })
    t.field('productsCount', {
      type: 'Int',
      args: {
        where: 'ProductWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.product.count(args)
      },
    })
  },
})

export const productMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneProduct()
    t.crud.updateOneProduct()
    t.crud.upsertOneProduct()
    t.crud.deleteOneProduct()
    t.crud.updateManyProduct()
    t.crud.deleteManyProduct()
  },
})
