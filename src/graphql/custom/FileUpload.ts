import { asNexusMethod, objectType } from '@nexus/schema'
import { GraphQLUpload } from 'apollo-server-express'

export const Upload = asNexusMethod(GraphQLUpload, 'upload')

export const File = objectType({
  name: 'File',
  definition(t) {
    t.list.string('files')
  },
})

export const FileShow = objectType({
  name: 'FileShow',
  definition(t) {
    t.upload('file')
  },
})
