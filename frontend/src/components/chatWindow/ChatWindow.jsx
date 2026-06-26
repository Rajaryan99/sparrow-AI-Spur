import React, { useContext } from 'react'
import './chatwindow.css'
import Chat from '../chat/Chat'
import { myContext } from '../../Context'

export default function ChatWindow() {

  const {prompt, setPrompt, reply, setReply, currThreadId} = useContext(myContext)

  const getReply = async () => {

    console.log("Message", prompt, "threadId", currThreadId)
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId
      })
    }

    try {

      const response = await fetch("http://localhost:3000/api/chat", options)
      console.log(response)
      
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
    <div className="chatwindow">
      <div className="navbar">
        <span>Spur Help Assistent</span>

      </div>

    <Chat></Chat>

      <div className="chatInput">
          <div className='userInput'>
            <input 
                type="text" 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)}
                placeholder='How can i help you' 
              />
            <div className='sendBtn' onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
          </div>
          <p className='info'>
Welcome to Sparrow, your AI-powered assistant for SPUR. Ask any question, and I'll be happy to help.          </p>
      </div>

    </div>
    </>
  )
}
