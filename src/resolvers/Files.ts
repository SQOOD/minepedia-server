import { arg, extendType } from '@nexus/schema'
import dotenv from 'dotenv'
import { minioClient } from '../utils/constants'

dotenv.config()

export const file = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('uploadFile', {
      type: 'File',
      args: {
        file: arg({ type: 'Upload' }),
      },
      resolve: async (_: any, { file }, {}: any) => {
        const { createReadStream, filename, mimetype } = await file

        const uploadedFile = await uploadFile(createReadStream(), filename)
        return {
          filename,
          uri: uploadedFile,
        }
      },
    })
  },
})

export const uploadFile = (createReadStream: any, filename: any) => {
  minioClient.putObject('minepedia', filename, createReadStream, function (
    err,
    etag
  ) {
    if (err) return console.log(err)
    console.log(etag)
  })
}
