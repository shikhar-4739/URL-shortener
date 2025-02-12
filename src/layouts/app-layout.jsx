import Header from '@/components/header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <>

        <main className='min-h-screen container mx-auto'>
            <Header />
            <Outlet />
        </main>

        <div className='p-10 text-center bg-gray-800 mt-10'>
            Made with ❤️ by Coder
        </div>
      
    </>
  )
}

export default AppLayout
