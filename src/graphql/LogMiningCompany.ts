import { objectType, arg, extendType } from '@nexus/schema'

export const LogMiningCompany = objectType({
  name: 'LogMiningCompany',
  definition(t) {
    t.model.id()
    t.model.admin()
    t.model.adminID()
    t.model.miningCompany()
    t.model.miningCompanyID()
    t.model.description()
    t.model.contentStatus()
    t.model.createdAt()
  },
})

export const logMiningCompanyQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.logMiningCompany()
    t.field('findFirstLogMiningCompany', {
      type: 'LogMiningCompany',
      args: {
        where: 'LogMiningCompanyWhereInput',
        orderBy: arg({ type: 'LogMiningCompanyOrderByInput', list: true }),
        cursor: 'LogMiningCompanyWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.logMiningCompany.findFirst(args)
      },
    })
    t.crud.logMiningCompanies({ filtering: true, ordering: true })
    t.field('logMiningCompaniesCount', {
      type: 'Int',
      args: {
        where: 'LogMiningCompanyWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.logMiningCompany.count(args)
      },
    })
  },
})

export const logMiningCompanyMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneLogMiningCompany()
    t.crud.updateOneLogMiningCompany()
    t.crud.upsertOneLogMiningCompany()
    t.crud.deleteOneLogMiningCompany()
    t.crud.updateManyLogMiningCompany()
    t.crud.deleteManyLogMiningCompany()
  },
})
