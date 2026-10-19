'use client'

// React Imports
import { Suspense } from 'react'
import type { ReactNode } from 'react'

// Component Imports
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import { SidebarInset } from '@/components/ui/sidebar'

const PagesLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className='flex h-full w-full min-w-0 overflow-x-hidden'>
      <Suspense>
        <Sidebar />
      </Suspense>
      <SidebarInset className='flex flex-1 flex-col min-w-0 w-full overflow-x-hidden'>
        <Header />
        <main className='mx-auto size-full max-w-360 flex flex-1 flex-col px-4 py-6 sm:px-6 min-w-0 w-full overflow-x-hidden'>{children}</main>
        <Footer />
      </SidebarInset>
    </div>
  )
}

export default PagesLayout
