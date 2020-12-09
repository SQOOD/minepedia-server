import { objectType } from '@nexus/schema'

export const CertificatePayload = objectType({
  name: 'CertificatePayload',
  definition(t) {
    t.string('name')
    t.string('tkdn')
    t.string('desc')
    t.string('hscode')
  },
})
