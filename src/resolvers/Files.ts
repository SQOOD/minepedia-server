import { arg, extendType, stringArg } from '@nexus/schema'
import { minioClient } from '../utils/constants'
import { encode } from 'typescript-base64-arraybuffer'

export const fileUpload = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('uploadFile', {
      type: 'File',
      args: {
        files: arg({ type: 'Upload', list: true }),
        productId: stringArg({ required: true }),
      },
      async resolve(_: any, { files, productId }, {}: any) {
        let fileList: any = []

        await Promise.all(
          files.map(async (file: any) => {
            const { createReadStream, filename, mimetype } = await file
            const filepath = `${productId}/${filename}`

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

            return filepath
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
        productId: stringArg({ required: true }),
      },
      async resolve(_: any, { productId }, {}: any) {
        let pathList: any = []
        let imageList: any = []
        const stream = minioClient.listObjects(
          process.env.MINIO_BUCKET,
          productId,
          true
        )

        stream.on('error', (err) => {
          console.log(err)
        })

        for await (const obj of stream) {
          pathList.push(obj)
        }

        await Promise.all(
          pathList.map(async (obj: any) => {
            minioClient.getObject(
              process.env.MINIO_BUCKET,
              obj.name,
              (err, dataStream) => {
                let bufferArr: any = []

                if (err) {
                  return console.log(err)
                }

                dataStream.on('error', (err) => {
                  console.log(err)
                })

                dataStream.on('data', (chunk) => {
                  bufferArr.push(chunk)
                })

                dataStream.on('end', () => {
                  encode(Buffer.concat(bufferArr))
                })
              }
            )
          })
        ).then((x) => console.log(x))
        return imageList
      },
    })
  },
})
