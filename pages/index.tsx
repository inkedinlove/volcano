import { prisma } from '../lib/prisma'
import Grid from '../components/Grid'
import Layout from '../components/Layout'
import Head from 'next/head'

export async function getStaticProps() {
  const Blockchains = await prisma.blockchain.findMany()

const blockchains = JSON.parse(JSON.stringify(Blockchains, (key, value) =>
  typeof value === 'bigint' ? value.toString() : value
));


  return {
    props: {
      blockchains,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 5, // In seconds
  }
}

export default function Home({ blockchains = [] }) {
  return (
    <>
      <Head>
        <link rel='canonical' href='' />
      </Head>
      <Layout>
        <h1 className='text-xl font-medium text-gray-800'>
          Top-rated places to build
        </h1>
        <p className='text-gray-500'>
          Explore some of the best networks in the world
        </p>
        <div className='mt-8'>
          <Grid key={blockchains.length} blockchains={blockchains} />
        </div>
      </Layout>
    </>
  )
}
