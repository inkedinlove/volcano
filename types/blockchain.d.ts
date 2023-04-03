import { Prisma } from '@prisma/client'

// https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
const blockchainArgs = Prisma.validator<Prisma.BlockchainArgs>()
export type IBlockchain = Prisma.BlockchainGetPayload<typeof blockchainArgs>
