/*
  Warnings:

  - You are about to drop the `Home` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavoritesHomes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Home" DROP CONSTRAINT "Home_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "_FavoritesHomes" DROP CONSTRAINT "_FavoritesHomes_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoritesHomes" DROP CONSTRAINT "_FavoritesHomes_B_fkey";

-- DropTable
DROP TABLE "Home";

-- DropTable
DROP TABLE "_FavoritesHomes";

-- CreateTable
CREATE TABLE "Blockchain" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "website" TEXT,
    "whitepaper" TEXT,
    "yearFounded" INTEGER,
    "founder" TEXT,
    "headquarters" TEXT,
    "token" TEXT,
    "tokenType" TEXT,
    "symbol" TEXT NOT NULL,
    "marketCap" DOUBLE PRECISION,
    "totalSupply" DOUBLE PRECISION,
    "circulatingSupply" DOUBLE PRECISION,
    "networkLayer" INTEGER,
    "accessibility" TEXT,
    "centralization" TEXT,
    "activeWallets" BIGINT,
    "nodes" TEXT,
    "singleEntities" INTEGER,
    "censorshipResistance" TEXT,
    "smartContract" BOOLEAN,
    "twentyFourHrPrice" DOUBLE PRECISION,
    "scriptingLanguage" TEXT,
    "tps" TEXT,
    "confirmationTime" TEXT,
    "consensusMechanism" TEXT,
    "vulnerabilities" TEXT,
    "assetValue" BIGINT,
    "networkCost" TEXT,
    "energyEfficiency" TEXT,
    "interoperability" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "notesId" TEXT NOT NULL,

    CONSTRAINT "Blockchain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FavoritesBlockchains" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Blockchain_symbol_key" ON "Blockchain"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritesBlockchains_AB_unique" ON "_FavoritesBlockchains"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritesBlockchains_B_index" ON "_FavoritesBlockchains"("B");

-- AddForeignKey
ALTER TABLE "Blockchain" ADD CONSTRAINT "Blockchain_notesId_fkey" FOREIGN KEY ("notesId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesBlockchains" ADD CONSTRAINT "_FavoritesBlockchains_A_fkey" FOREIGN KEY ("A") REFERENCES "Blockchain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesBlockchains" ADD CONSTRAINT "_FavoritesBlockchains_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
