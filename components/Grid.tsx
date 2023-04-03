import Card from '../components/Card'
import { ExclamationIcon } from '@heroicons/react/outline'
import { IBlockchain } from '../types/blockchain'
import { useFavorites } from 'hooks/useFavorites'
interface IGridProps {
  blockchains: IBlockchain[]
}

const Grid = ({ blockchains = [] }: IGridProps) => {
  const { favorites } = useFavorites()
  const isEmpty = blockchains.length === 0
  console.log(blockchains)
  return isEmpty ? (
    <p className='inline-flex max-w-max items-center space-x-1 rounded-md bg-amber-100 px-4 py-2 text-amber-700'>
      <ExclamationIcon className='mt-px h-5 w-5 shrink-0' />
      <span>Unfortunately, there is nothing to display yet.</span>
    </p>
  ) : (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {blockchains.map((blockchain: IBlockchain) => (
        <Card
          key={blockchain.id}
          {...blockchain}
          isFavorite={
            favorites &&
            favorites?.length !== 0 &&
            favorites.filter((fav: IBlockchain) => fav.id === blockchain.id).length !== 0
          }
        />
      ))}
    </div>
  )
}

export default Grid
