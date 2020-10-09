import { objectType } from '@nexus/schema';

const AuthPayloadVendor = objectType({
  name: 'AuthPayloadVendor',
  definition(t) {
    t.string('token')
    t.field('vendor', { type: 'Vendor' })
  },
})

export default AuthPayloadVendor