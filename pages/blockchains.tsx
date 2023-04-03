import Layout from '../components/Layout'
import Grid from '../components/Grid'
import { prisma } from '../lib/prisma'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth/next'
import { GetServerSideProps } from 'next'

const Blockchains = ({ blockchains = [] }) => {
  return (
    <Layout>
      <h1 className='text-xl font-medium text-gray-800'>My Blockchains</h1>
      <p className='text-gray-500'>
        Manage your blockchains and update your notes
      </p>
      <div className='mt-8'>
        <Grid blockchains={blockchains} />
      </div>
    </Layout>
  )
}
export default Blockchains

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  )
  if (!session) {
    return {
      redirect: { destination: '/', permanent: false },
    }
  }
  try {
    const blockchains = await prisma.blockchain.findMany({
      where: { owner: { email: session.user.email } },
      orderBy: { createdAt: 'desc' },
    })
    context.res.setHeader(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    )
    return {
      props: { blockchains: JSON.parse(JSON.stringify(blockchains)) },
    }
  } catch (error) {
    console.error(error)
    return {
      props: {},
    }
  }
}
