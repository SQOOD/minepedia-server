// import { extendType, stringArg } from '@nexus/schema'

// export const Logs = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.field('createManyLogVendors', {
//       type: 'LogVendor',
//       args: {
//         adminID: stringArg({ required: true }),
//         description: stringArg({nullable: true}),
//         contentStatus: "ContentStatus",
//         vendorID: stringArg({required: true, list: true})
//       },
//       async resolve(_root, args, ctx) {
//         try {
//           const log = await args.vendorID.map( (x:string) =>
//             ctx.prisma.logVendor.create({
//               data: {
//                 description: args.adminID,
//                 contentStatus: args.contentStatus,
//                 admin: {
//                   connect: {
//                     id: args.adminID
//                   }
//                 },
//                 vendor: {
//                   connect: {
//                     id: parseInt(x)
//                   }
//                 }
//               },
//             })
//           )

//           return log
//         } catch(e){
//           console.log(e)
//         }
//       },
//     })
//   },
// })
