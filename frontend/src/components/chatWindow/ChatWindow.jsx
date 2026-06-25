import React from 'react'
import './chatwindow.css'
import chat from '../chat/Chat'
import Chat from '../chat/Chat'

export default function ChatWindow() {
  return (
    <>
    <div className="chatwindow">
      <div className="navbar">
        <span>Spur Help Assistent</span>

      </div>

    <Chat></Chat>

      <div className="chatInput">
          <div className='userInput'>
            <input type="text" placeholder='How can i help you' />
            <div className='sendBtn'><i class="fa-solid fa-paper-plane"></i></div>
          </div>
          <p className='info'>
Welcome to Sparrow, your AI-powered assistant for SPUR. Ask any question, and I'll be happy to help.          </p>
      </div>

    </div>
    </>
  )
}
