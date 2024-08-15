import Navar from './components/Navbar/Navar'
import Heero from './components/Hero/Heero'
import Highlight from './components/Highlight/Highlight'
import Model from './components/Model/Model'

import * as Sentry from "@sentry/react"
import Features from './components/Features/Features'

const App = () => {


//  return<button type="button"onClick={() => MethodDoesNotExist()}>Break the world </button>


  

  return (
 <main className="bg-black">
   <Navar/>
   <Heero/>
   <Highlight/>
   <Model/>
   <Features/>
 </main>
  )
}

export default Sentry.withProfiler(App)
