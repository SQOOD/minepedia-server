import { extendType, stringArg } from '@nexus/schema'
import axios from 'axios'

export const Certificate = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('certificate', {
      type: 'CertificatePayload',
      args: {
        cert: stringArg({ required: true }),
      },
      async resolve(_: any, { cert }, {}: any) {
        let x: any

        const data = JSON.stringify({
          sBusSecurity: { username: 'dj_minerba', password: 'M!nrba@2018' },
          cekNomorSertifikat: { nomor_sertifikat: cert },
        })

        await axios({
          method: 'post',
          url: 'https://soadev.esdm.go.id/tkdn/get_sertifikat',
          headers: {
            'Content-Type': 'application/json',
          },
          data: data,
        })
          .then(function (response) {
            x = response.data[0].spesifikasi.map((x: any) => {
              return {
                name: `${x.jenis_produk} ${
                  x.tipe.length > 2 ? `- ${x.tipe}` : ''
                } ${x.merk.length > 2 ? `- ${x.merk}` : ''}`,
                tkdn: x.nilai,
                description: x.uraian_produk,
                hscode: x.hs,
              }
            })
          })
          .catch(function (error) {
            console.log(error)
          })
        return x
      },
    })
  },
})
