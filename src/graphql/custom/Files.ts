import { arg, extendType, stringArg } from '@nexus/schema'
import { minioClient } from '../../utils/constants'
import { Base64 } from 'js-base64'

export const fileUpload = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('uploadFile', {
      type: 'File',
      args: {
        files: arg({ type: 'Upload', list: true }),
        id: stringArg({ required: true }),
      },
      async resolve(_: any, { files, id }, {}: any) {
        let fileList: any = []

        await Promise.all(
          files.map(async (file: any, index) => {
            const { createReadStream, filename, mimetype } = await file

            const filepath = `${id}/${filename}`

            if (mimetype == 'image/jpeg') {
              await minioClient.putObject(
                process.env.MINIO_BUCKET,
                filepath,
                createReadStream(),
                (err) => {
                  if (err) return console.log(err)
                }
              )
            }

            return filename
          })
        ).then((x) => (fileList = x))

        return {
          files: fileList,
        }
      },
    })
  },
})

export const fileDisplay = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('showImages', {
      type: 'String',
      args: {
        id: stringArg({ required: true }),
      },
      async resolve(_: any, { id }, {}: any) {
        let image: any = []

        // const address = `${process.env.MINIO_SSL ? 'https://' : 'http://'}${
        //   process.env.MINIO_ENDPOINT
        // }:${process.env.MINIO_PORT}/`

        const stream = minioClient.listObjects(
          process.env.MINIO_BUCKET,
          id,
          true
        )

        for await (const obj of stream) {
          image.push(obj)
        }

        stream.on('error', (err) => {
          console.log(err)
        })

        const path = image.map((x: any) => (x = x.name))

        return path
      },
    })
  },
})
