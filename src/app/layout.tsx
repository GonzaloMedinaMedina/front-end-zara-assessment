'use client'
import './globals.css'
import Link from 'next/link'
import LoadingIcon from './loadingIcon'
import { useState, createContext } from "react";

export const ShowLoadingIconContext = createContext((a:boolean) => {});

export default function RootLayout({children,}: {children: React.ReactNode}) 
{
  const [showLoadingIcon, setShowLoadingIcon] = useState(false);

  return (
    <html lang="en">
      <body className="bg-white">        
        <main className="flex min-h-screen flex-col items-center justify-start p-5">
          <ShowLoadingIconContext.Provider value={setShowLoadingIcon}>
            <div className='flex min-w-full'>
              <div className="flex-1	">
                <Link href="/" onClick={() => {setShowLoadingIcon(false)}}>
                  <h1 className="text-blue-600 text-3xl">Podcaster</h1>
                </Link>
              </div>
              <LoadingIcon showIcon={showLoadingIcon}/>
            </div>
            <hr className="min-w-full"></hr>
            <div className="relative flex flex-col py-5 min-w-full">
                {children}
            </div>
          </ShowLoadingIconContext.Provider>
        </main>
      </body>
    </html>
  )
}
