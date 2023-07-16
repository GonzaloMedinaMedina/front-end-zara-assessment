import './globals.css'

export default function RootLayout({children,}: {children: React.ReactNode}) 
{
  return (
    <html lang="en">
      <body className="bg-white">        
        <main className="flex min-h-screen flex-col items-center justify-start p-5">
          <div className="self-start min-w-full">
            <a href="/">
              <h1 className="text-blue-600 text-3xl">Podcaster</h1>
            </a>
            <hr></hr>
          </div>
          <div className="relative flex flex-col py-5 min-w-full">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
