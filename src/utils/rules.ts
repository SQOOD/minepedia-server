// import { shield, rule } from 'graphql-shield'
// import { Context } from '../types'
// import { handleError } from './helpers'
// import { errors } from './constants'

// export const rules = {
//   isAuthenticatedUser: rule({ cache: 'contextual' })(
//     (_parent, _args, ctx: Context) => {
//       try {
//         if (ctx.userId === -1) {
//           return handleError(errors.notAuthenticated)
//         }
//         return true
//       } catch (e) {
//         return e
//       }
//     }
//   ),
//   isOwner: rule({ cache: 'contextual' })(
//     async (_parent, { id }, ctx: Context) => {
//       try {
//         const vendor = await ctx.prisma.vendor
//           .findOne({
//             where: {
//               id,
//             },
//           })
//         return ctx?.userId === vendor?.id
//       } catch (e) {
//         return e
//       }
//     }
//   ),
// }

// export const permissions = shield({
//   Query: {
//     me: rules.isAuthenticatedUser,
//     posts: rules.isAuthenticatedUser,
//     post: rules.isAuthenticatedUser,
//   },
//   Mutation: {
//     createDraft: rules.isAuthenticatedUser,
//     deletePost: rules.isPostOwner,
//     publish: rules.isPostOwner,
//   },
//   Subscription: {
//     latestPost: rules.isAuthenticatedUser,
//   },
// })
