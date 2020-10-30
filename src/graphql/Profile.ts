import { objectType, arg, extendType } from '@nexus/schema'

export const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.address()
    t.model.companyType()
    t.model.phone()
    t.model.geolocation()
    t.model.province()
    t.model.district()
    t.model.vendor()
    t.model.vendorID()
    t.model.sales()
    t.model.merchantID()
    t.model.products()
  },
})

export const profileQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.profile()
    t.field('findFirstProfile', {
      type: 'Profile',
      args: {
        where: 'ProfileWhereInput',
        orderBy: arg({ type: 'ProfileOrderByInput', list: true }),
        cursor: 'ProfileWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.profile.findFirst(args)
      },
    })
    t.crud.profiles({ filtering: true, ordering: true })
    t.field('profilesCount', {
      type: 'Int',
      args: {
        where: 'ProfileWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.profile.count(args)
      },
    })
  },
})

export const profileMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneProfile()
    t.crud.updateOneProfile()
    t.crud.upsertOneProfile()
    t.crud.deleteOneProfile()
    t.crud.updateManyProfile()
    t.crud.deleteManyProfile()
  },
})
