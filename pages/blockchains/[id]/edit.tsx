// import Layout from 'components/Layout'
// import ListingForm from 'components/ListingForm'
// import { IHome } from 'types/home'
// import { prisma } from 'lib/prisma'
// import { GetServerSideProps } from 'next'
// import { unstable_getServerSession } from 'next-auth'
// import { authOptions } from 'pages/api/auth/[...nextauth]'

// const Edit = (blockchain: IHome) => {
//   const updateBlockchain = async (data: Partial<IHome>) => {
//     await fetch(`/api/blockchains/${blockchain?.id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })
//   }

//   return (
//     <Layout>
//       <div className='mx-auto max-w-screen-sm'>
//         <h1 className='text-xl font-medium text-gray-800'>Edit your blockchain</h1>
//         <p className='text-gray-500'>
//           Fill out the form below to update your blockchain.
//         </p>
//         <div className='mt-8'>
//           <ListingForm
//             onSubmit={updateBlockchain}
//             initialValues={blockchain}
//             buttonText='Update blockchain'
//             redirectPath={`/blockchain/${blockchain?.id}`}
//           />
//         </div>
//       </div>
//     </Layout>
//   )
// }

// // Check if current logged user owns the home, if so, authorize editing, otherwise, redirect to home page
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const redirect = {
//     redirect: {
//       destination: '/',
//       permanent: false,
//     },
//   }
//   const session = await unstable_getServerSession(
//     context.req,
//     context.res,
//     authOptions
//   )

//   if (!session) {
//     return redirect
//   }

//   const user = await prisma.user.findUnique({
//     where: { email: session.user.email as string },
//     select: { listedBlockchains: true },
//   })

//   const id = context?.params?.id
//   const blockchain = user?.listedBlockchains.find((blockchain: { id: string | string[] | undefined }) => blockchain.id === id)
//   if (!blockchain) {
//     return redirect
//   }
//   context.res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
//   return {
//     props: JSON.parse(JSON.stringify(blockchain)),
//   }
// }

// export default Edit
