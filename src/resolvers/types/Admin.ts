import { objectType, extendType } from '@nexus/schema';

export const Admin = objectType({
  name: 'Admin',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.nik();
    t.model.password();
    t.model.role();
  },
});

export const adminQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.admin();
    t.crud.admins({ filtering: true, ordering: true });

    t.field('adminsCount', {
      type: 'Int',
      args: {
        where: 'AdminWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.admin.count(args);
      },
    });
  },
});

export const adminMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneAdmin();
    t.crud.updateOneAdmin();
    t.crud.upsertOneAdmin();
    t.crud.deleteOneAdmin();

    t.crud.updateManyAdmin();
    t.crud.deleteManyAdmin();
  },
});
