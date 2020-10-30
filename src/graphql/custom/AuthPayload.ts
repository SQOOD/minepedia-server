import { objectType } from '@nexus/schema'

const AuthPayloadVendor = objectType({
  name: 'AuthPayloadVendor',
  definition(t) {
    t.string('token')
    t.field('vendor', { type: 'Vendor' })
  },
})

const AuthPayloadAdmin = objectType({
  name: 'AuthPayloadAdmin',
  definition(t) {
    t.string('token')
    t.field('admin', { type: 'Admin' })
  },
})

export { AuthPayloadVendor, AuthPayloadAdmin }
