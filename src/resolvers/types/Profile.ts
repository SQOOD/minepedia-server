import { objectType, extendType } from '@nexus/schema';

export const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.address();
    t.model.companyType();
    t.model.phone();
    t.model.geolocation();
    t.model.vendor();
    t.model.vendorId();
    t.model.products();
  },
});

export const profileQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.profile();
    t.crud.profiles({ filtering: true, ordering: true });

    t.field('profilesCount', {
      type: 'Int',
      args: {
        where: 'ProfileWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.profile.count(args);
      },
    });
  },
});

export const profileMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneProfile();
    t.crud.updateOneProfile();
    t.crud.upsertOneProfile();
    t.crud.deleteOneProfile();

    t.crud.updateManyProfile();
    t.crud.deleteManyProfile();
  },
});
