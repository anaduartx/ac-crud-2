import Head from 'next/head'

import Create from '../component/create'
import Read from '../component/read'

export default function Home() {

  return (
    <>
      <Head>
        <title>Crud Simples com Firestore</title>
      </Head>
      <main className='container'>
      <div className="row">
        <div className="col-lg">
         <Create></Create>
      </div>
      <div className="col-lg">
      <Read></Read>
      </div>
      </div>
    </main>
        </>
  )
}
