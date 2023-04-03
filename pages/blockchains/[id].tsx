import Image from 'next/image'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import { IBlockchain} from '../../types/blockchain'
import { prisma } from '../../lib/prisma'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { PencilIcon } from '@heroicons/react/solid'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

export default function ListedBlockchain(blockchain: IBlockchain) {
  const router = useRouter()
  const { data: session } = useSession()
  const [isOwner, setIsOwner] = useState(false)
  const [deleting, setDeleting] = useState(false)

  console.log(session)
  console.log(blockchain)

  const deleteBlockchain = async () => {
    let toastId
    try {
      toastId = toast.loading('Deleting blockchain...')
      setDeleting(true)
      await fetch(`/api/blockchain/${blockchain?.id}`, { method: 'DELETE' })

      toast.success('Blockchain deleted', { id: toastId })
      router.push('/blockchains')
    } catch (error) {
      console.log(error)
      toast.error('Unable to delete blockchain', { id: toastId })
      setDeleting(false)
    }
  }

  useEffect(() => {
    if (session?.user && blockchain) {
      setIsOwner(session.user.id === blockchain.tps)
    }
  }, [session, blockchain])

  return (
    <Layout>
      <div className='mx-auto max-w-screen-lg'>
        <div className='flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-x-4'>
          <div>
            <h1 className='truncate text-2xl font-semibold'>
              {blockchain?.title ?? ''}
            </h1>
            <ol className='inline-flex items-center space-x-1 text-gray-500'>
              <li>
                <span>{blockchain?.price ?? 0} price</span>
                <span aria-hidden='true'> · </span>
              </li>
              <li>
                <span>{blockchain?.tps ?? 0} tps</span>
                <span aria-hidden='true'> · </span>
              </li>
              <li>
                <span>{blockchain?.yearFounded ?? 0} established</span>
                <span aria-hidden='true'> · </span>
              </li>
            </ol>
          </div>
          {isOwner ? (
            <div className='flex items-center space-x-2'>
              <button
                type='button'
                disabled={deleting}
                onClick={() => router.push(`/homes/${blockchain?.id}/edit`)}
                className='rounded-md border border-gray-800 px-4 py-1 text-gray-800 transition hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed disabled:bg-transparent disabled:text-gray-800 disabled:opacity-50'
              >
                <PencilIcon />
                Edit
              </button>

              <button
                type='button'
                disabled={deleting}
                onClick={deleteBlockchain}
                className='rounded-md border border-blue-500 px-4 py-1 text-blue-500 transition hover:bg-blue-500 hover:text-white focus:outline-none disabled:cursor-not-allowed disabled:bg-rose-500 disabled:text-white disabled:opacity-50'
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          ) : null}
        </div>

        <div className='aspect-w-16 aspect-h-9 relative mt-6 overflow-hidden rounded-lg bg-gray-100 shadow-md'>
          {blockchain?.image ? (
            <Image
              sizes=' sizes="(min-width: 1075px) 92vw,
              (min-width: 1200px) 80vw;
              95vw"'
              priority
              src={blockchain.image}
              alt={blockchain.title}
              fill
              className='object-cover'
            />
          ) : null}
        </div>
        <h2 className='mt-4 text-xl font-semibold uppercase tracking-tight'>
          Description
        </h2>
        <p className='mt-2 text-lg'>{blockchain?.description ?? ''}</p>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const blockchains = await prisma.blockchain.findMany()

  return {
    paths: blockchains.map((blockchain) => ({
      params: { id: blockchain.id.toString() },
    })),
    fallback: false,
  }
}


  
export async function getStaticProps({ params }: Params) {
  const id = params?.id

  if (!id || isNaN(+id)) {
    return {
      notFound: true,
    }
  }

  const blockchain = await prisma.blockchain.findUnique({
    where: {
      id: id.toString(),
    },
  })

  return {
    props: {
      blockchain: JSON.parse(JSON.stringify(blockchain)),
    },
  }
}






