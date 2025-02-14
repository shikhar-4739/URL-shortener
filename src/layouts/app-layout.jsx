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

        <div className='py-5 text-center bg-gray-800 mt-10'>
            Made with ❤️ in India &copy; 2025
        </div>
      
    </>
  )
}

export default AppLayout
