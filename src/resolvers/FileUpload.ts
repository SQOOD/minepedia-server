import { asNexusMethod, objectType } from '@nexus/schema'
import { GraphQLUpload } from 'apollo-server-express'

export const Upload = asNexusMethod(GraphQLUpload, 'upload')

export const File = objectType({
  name: 'File',
  definition(t) {
    t.string('uri')
    t.string('filename')
  },
})
