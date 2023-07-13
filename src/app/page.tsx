import MainView from './mainView/mainView'

export default function Home() 
{
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-5">
      <div className="self-start min-w-full">
        <h1 className="text-blue-600 text-3xl">Podcaster</h1>
        <hr></hr>
      </div>
      <MainView></MainView>
    </main>
  )
}
