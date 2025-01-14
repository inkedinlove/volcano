import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta
          name='description'
          content='Blockcarve is a discovery platform for blockchain enthusiasts and developers.'
        />
        <meta
          name='title'
          content='Fullstack App with Next.js, NextAuth, Supabase & Prisma'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
