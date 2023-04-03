import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

async function seed() {
  const { data } = await axios.get(
    "https://api.coingecko.com/api/v3/coins/polkadot?localization=true&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true"
  );

  await prisma.blockchain.create({
    data: {
      title: data.name,
      website: data.links.homepage[0]?.url,
      image: data.image.large,
      whitepaper: data.whitepaper?.url,
      description: data.description.en,
      yearFounded: data.genesis_date
        ? new Date(data.genesis_date).getFullYear()
        : null,
      founder: data.genesis_block_founder,
      headquarters: data.country_origin,
      token: data.asset_platform_id,
      tokenType: data.asset_platform_name,
      symbol: data.symbol.toUpperCase(),
      marketCap: data.market_data.market_cap?.usd,
      totalSupply: data.market_data.total_supply,
      circulatingSupply: data.market_data.circulating_supply,
      networkLayer: data.categories.layer,
      accessibility: data.accessibility,
      centralization: data.centralization,
      activeWallets: data.tickers.length,
      nodes: data.nodes,
      singleEntities: data.centralized_exchange_count,
      censorshipResistance: data.censorship_resistance,
      smartContract: data.contract?.is_smart_contract,
      twentyFourHrPrice: data.market_data.current_price.usd,
      scriptingLanguage: data.scripting?.language,
      tps: data.tps,
      confirmationTime: data.confirmations,
      consensusMechanism: data.hashing_algorithm,
      vulnerabilities: data.vulnerabilities?.join(","),
      assetValue: data.asset_value?.usd,
      networkCost: data.network_cost?.usd,
      energyEfficiency: data.energy_efficiency?.value,
      interoperability: data.interoperability?.description,
      price: data.market_data.current_price.usd,
    },
  });
}

seed()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
