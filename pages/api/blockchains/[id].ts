// import { prisma } from 'lib/prisma'
// import { supabase } from 'lib/supabase'
// import checkEnv from 'utils/getEnv'
// import { NextApiRequest, NextApiResponse } from 'next'
// import { authOptions } from 'pages/api/auth/[...nextauth]'
// import { unstable_getServerSession } from 'next-auth/next'

// // 401 -> Authentication errors
// // 403 -> Authorization errors
// // Reference:   https://www.rfc-editor.org/rfc/rfc9110#status.401

// const METHOD_NOT_ALLOWED = 405
// const UNAUTHENTICATED = 401
// const UNAUTHORIZED = 403
// const SERVER_ERROR = 500

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const session = await unstable_getServerSession(req, res, authOptions)
//     if (!session?.user) {
//       return res.status(UNAUTHENTICATED).json({
//         message: 'The request lacks valid authentication credentials ',
//       })
//     }
//     const user = await prisma.user.findUnique({
//       where: { email: session.user.email as string },
//       select: { listedBlockchains: true },
//     })
//     const { id } = req.query
//     if (!user?.listedBlockchains.find((blockchain) => blockchain.id === id)) {
//       return res
//         .status(UNAUTHORIZED)
//         .json({ message: 'You are not authorized to access this resource' })
//     }
//     // Update blockchain
//     if (req.method === 'PATCH') {
//       const blockchain = await prisma.blockchain.update({
//         where: { id } as { id: string },
//         data: req.body,
//       })
//       res.status(200).json({ blockchain })
//     }
//     // Delete blockchain
//     else if (req.method === 'DELETE') {
//       const blockchain = await prisma.blockchain.delete({
//         where: { id } as { id: string },
//       })
//       // delete image from supabase storage bucket
//       if (blockchain?.image) {
//         const path = blockchain.image.split('/').pop()
//         console.log(path)
//         const { data, error } = await supabase.storage
//           .from(checkEnv(process.env.SUPABASE_BUCKET))
//           .remove([path as string])
//         if (error) {
//           console.log(error)
//           throw new Error(error.message)
//         }
//       }
//       res.status(200).json({ blockchain })
//     }
//     // Unsupported method
//     else {
//       res.setHeader('Allow', ['PATCH', 'DELETE'])
//       res.status(METHOD_NOT_ALLOWED).json({ message: 'Unsupported method' })
//     }
//   } catch (error) {
//     console.error(error)
//     res.status(SERVER_ERROR).json({
//       message: `The server was not able to process your request: ${error}`,
//     })
//   }
// }
