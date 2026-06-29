import React, { useContext, useEffect, useState } from 'react'
import './chatwindow.css'
import Chat from '../chat/Chat'
import { myContext } from '../../Context'
import {PacmanLoader} from 'react-spinners'
export default function ChatWindow() {

  const {prompt, setPrompt, isNewReply, setIsNewReply, prevChats, setPrevChats, reply, setReply, currThreadId} = useContext(myContext)
  const [loading, setLoading] = useState(false)

  const getReply = async () => {

      if (!prompt || prompt.trim() === '') return;  
  if (prompt.length > 1000) {
    alert('Message too long. Max 1000 characters.');
    return;
  }

    setLoading(true)

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

      const response = await fetch("https://sparrow-ai-spur-backend.onrender.com/api/chat", options)
      const res = await response.json()
      console.log("frontend got: ", res)
      setIsNewReply(true);
      setReply(res.reply)
      
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }


  useEffect(() => {

    if(prompt && reply){
      setPrevChats(prevChats => {
       return [...prevChats, {
          role: 'user',
          content: prompt
        }, {
          role: 'assistant',
          content: reply
        }]
      }) 
    }

    setPrompt("")
  }, [reply])

  return (
    <>
    <div className="chatwindow">
      <div className="navbar">
        <span>Spur Help Assistent</span>

      </div>

    <Chat></Chat>

    <PacmanLoader loading={loading} >

    </PacmanLoader>

      <div className="chatInput">
          <div className='userInput'>
            <input 
                type="text" 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)}
                placeholder='How can i help you' 
                onKeyDown={(e) => e.key === 'Enter' && !loading  ? getReply(): ''}
                disabled={loading}
              />
            <div className='sendBtn' onClick={!loading? getReply : undefined}><i className="fa-solid fa-paper-plane"></i></div>
          </div>
          <p className='info'>
Welcome to Sparrow, your AI-powered assistant for SPUR. Ask any question, and I'll be happy to help.          </p>
      </div>

    </div>
    </>
  )
}
