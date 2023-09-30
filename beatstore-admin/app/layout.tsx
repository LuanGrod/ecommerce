import ModalProvider from '@/providers/modal-provider'
import ToasterProvider from '@/providers/toast-provider'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin - Dashboard',
  description: 'Admin - Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

/*
https://clerk.com/docs/quickstarts/nextjs
https://ui.shadcn.com/docs/components/data-table
https://app.planetscale.com/luan14rodrigues17/beatstore-admin
*/