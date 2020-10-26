import { objectType, extendType } from '@nexus/schema'

export const Product = objectType({
  name: 'Product',
  definition(t) {
    t.model.id()
    t.model.productId()
    t.model.name()
    t.model.profile()
    t.model.profileId()
    t.model.unit()
    t.model.tkdn()
    t.model.hscode()
    t.model.country()
    t.model.certificate()
    t.model.category()
    t.model.minPurchase()
    t.model.description()
    t.model.createdAt()
    t.model.price()
    t.model.customizable()
    t.model.details()
  },
})

export const productQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.product()
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
