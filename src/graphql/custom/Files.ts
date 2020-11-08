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
          files.map(async (file: any) => {
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
        id: stringArg({ required: true }),
      },
      async resolve(_: any, { id }, {}: any) {
        let pathList: any = []
        let imageList: any = []
        const stream = minioClient.listObjects(
          process.env.MINIO_BUCKET,
          id,
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
                  console.log(Base64.fromUint8Array(bufferArr.toString('utf8')))
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
