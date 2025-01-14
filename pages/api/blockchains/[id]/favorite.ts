import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'

const UNAUTHENTICATED = 401

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await await unstable_getServerSession(req, res, authOptions)
  if (!session?.user) {
    return res.status(UNAUTHENTICATED).json({
      message: 'The request lacks valid authentication credentials ',
    })
  }

  // Retrieve blockchain ID from request path parameter
  const { id } = req.query
  if (req.method === 'PUT') {
    try {
      // Add blockchain to user's favorites
      await prisma.blockchain.update({
        where: { id: id as string },
        data: {
          favoriteBy: {
            connect: { id: session.user.id },
          },
        },
      })
      res
        .status(200)
        .json({ message: "Successfully added home to user's favorites" })
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ message: 'Unable to add home to favorites' })
    }
  }
  // Remove blockchain from user's favorites
  else if (req.method === 'DELETE') {
    try {
      await prisma.blockchain.update({
        where: { id: id as string },
        data: {
          favoriteBy: {
            disconnect: { id: session.user.id },
          },
        },
      })
      res
        .status(200)
        .json({ message: "Successfully removed blockchain from user's favorites" })
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ message: "Unable to remove blockchain of user's favorites" })
    }
  }
  // Return error if request method is not PUT or DELETE
  // Status 405 Method Not Allowed
  else {
    res.setHeader('Allow', ['PUT', 'DELETE'])
    res.status(405).json({ message: `Method ${req.method} Not Allowed` })
  }
}
