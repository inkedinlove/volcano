import { prisma } from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from 'pages/api/auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)
  // Check if user is authenticated
  if (!session?.user) {
    return res.status(401).json({
      message: 'The request lacks valid authentication credentials ',
    })
  }
  const { id } = req.query
  // Check if the user logged is the same as the user in the request parameters
  if (id !== session.user.id) {
    return res.status(403).json({ message: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    try {
      // Retrieve blockchain ID from request body
      const favorite = await prisma.user.findMany({
        where: { id: id },
        select: {
          favoriteblockchains: true,
        },
      })
      // Return favoritesBlockchains array empty or not
      const favoriteblockchains =
        favorite.length === 0 ? favorite : favorite[0].favoriteblockchains
      res.status(200).json(favoriteblockchains)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
  // Unsupported method
  else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Unsupported method: ${req.method}` })
  }
}
