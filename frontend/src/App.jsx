import { useState } from 'react'
import SideBar from './components/sidebar/SideBar'
import ChatWindow from './components/chatWindow/ChatWindow'
import { myContext } from './Context'

import './App.css'

function App() {
  const providerValues = {};

  return (
    <>
   
     <div className="main">
       <myContext.Provider value={providerValues}>
                  <SideBar/>
                  <ChatWindow/>
          </myContext.Provider>
     </div>
   
       
    </>
  )
}

export default App
