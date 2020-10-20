import { arg, extendType, stringArg } from '@nexus/schema'
import dotenv from 'dotenv'
import { minioClient } from '../utils/constants'

dotenv.config()

export const file = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('uploadFile', {
      type: 'File',
      args: {
        files: arg({ type: 'Upload', list: true }),
        productId: stringArg({ required: true }),
      },
      resolve(_: any, { files, productId }, {}: any) {
        let fileList: any = []

        files.forEach(async (file: any) => {
          const { createReadStream, filename, mimetype } = await file

          if (mimetype == 'image/jpeg') {
            const filepath = `${productId}/${filename}`
            await uploadFile(createReadStream(), filepath)
            fileList.push(filename)
            console.log(filename)
          }
        })
        console.log(fileList)
        return {
          filename: fileList,
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
  })
}
