import { useState } from 'react'
import SideBar from './components/sidebar/SideBar'
import ChatWindow from './components/chatWindow/ChatWindow'
import { myContext } from './Context'
import {v4 as uuidv4} from 'uuid'

import './App.css'

function App() {

  const [prompt, setPrompt] = useState("")
  const [reply, setReply] = useState(null)
  const [currThreadId, setCurrThreadId] = useState(uuidv4())

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId
  };

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
