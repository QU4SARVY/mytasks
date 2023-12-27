import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import Sidebar from './Components/Sidebar/Sidebar'
import GlobalStyleProvider from './providers/GlobalStyleProvider'
import ContextProvider from './providers/ContextProvider'
import { ClerkProvider, auth } from '@clerk/nextjs'
import NextTopLoader from 'nextjs-toploader';

const nunito = Nunito({ subsets: ['latin'], weight:["400", "500" , "600", "700", "800"]});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode 
}) {

  const {userId} = auth()

  return(
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
            integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </head>
        <body className={nunito.className}>
          <NextTopLoader 
          height={2}
          color="#27AE60"
          easing="cubic-bezier(.53,0.21,0,0,1)"
          />
          <ContextProvider>
            <GlobalStyleProvider>
              {userId && <Sidebar />}
              <div className="w-full">{children}</div>
            </GlobalStyleProvider>
          </ContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}