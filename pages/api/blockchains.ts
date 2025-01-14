// import type { NextApiRequest, NextApiResponse } from 'next'
// import { prisma } from '../../lib/prisma'
// import { unstable_getServerSession } from 'next-auth'
// import { authOptions } from './auth/[...nextauth]'

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   // Check if user is authenticated
//   const session = await unstable_getServerSession(req, res, authOptions)

//   // If no session exists, return 401 status code unauthorized
//   if (!session) {
//     return res.status(401).json({ message: 'Unauthorized' })
//   }

//   if (req.method === 'POST') {
//     try {
//       const { image, title, description, price, guests, beds, baths } = req.body

//       // Check if session.user is defined and has an email
//       if (session.user && session.user.email) {
//         // Find the user
//         const user = await prisma.user.findUnique({
//           where: { email: session.user.email },
//         })
//         // If user is not found, return 400 status code
//         if (!user) {
//           return res.status(400).json({ message: 'User not found' })
//         }
//         // Create a blockchain in the database and return it in the response
//         const blockchain = await prisma.blockchain.create({
//           data: {
//             image,
//             title,
//             description,
//             price,
//             ownerID: user.id,
//           },
//         })
//         res.status(200).json(blockchain)
//       }
//     } catch (error) {
//       console.error(error)
//       res.status(500).json({
//         message: `Something went wrong ${
//           error instanceof Error && error.message
//         }`,
//       })
//     }
//   } else {
//     res.setHeader('Allow', ['POST'])
//     res.status(405).json({ message: `The ${req.method} isn't supported` })
//   }
// }
