import { objectType, arg, extendType } from '@nexus/schema'

export const MiningCompany = objectType({
  name: 'MiningCompany',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.email()
    t.model.password()
    t.model.npwp()
    t.model.profile()
    t.model.approved()
    t.model.log()
    t.model.profileId()
  },
})

export const miningCompanyQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.miningCompany()
    t.field('findFirstMiningCompany', {
      type: 'MiningCompany',
      args: {
        where: 'MiningCompanyWhereInput',
        orderBy: arg({ type: 'MiningCompanyOrderByInput', list: true }),
        cursor: 'MiningCompanyWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.miningCompany.findFirst(args)
      },
    })
    t.crud.miningCompanies({ filtering: true, ordering: true })
    t.field('miningCompaniesCount', {
      type: 'Int',
      args: {
        where: 'MiningCompanyWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.miningCompany.count(args)
      },
    })
  },
})

export const miningCompanyMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneMiningCompany()
    t.crud.updateOneMiningCompany()
    t.crud.upsertOneMiningCompany()
    t.crud.deleteOneMiningCompany()
    t.crud.updateManyMiningCompany()
    t.crud.deleteManyMiningCompany()
  },
})
