import React, { useContext } from 'react'
import './chat.css'
import { myContext } from '../../Context'

export default function Chat() {



  const {reply, prevChats, setPrevChats, newChat, setNewChat} = useContext(myContext)
  return (
    <>
    {newChat && <h1>Ask your query???</h1>}
    <div className='chatBox'>

      {
        prevChats?.map((chat, idx) => 
          <div className={chat.role === "user"? "prompt": "AIReply"} key={idx}>
                  {
                    chat.role === "user"? 
                    <p className='userMessage'>{chat.content}</p>: 
                    <p className='AImessage'>{chat.content}</p>
                  }
          </div>

        )
      }


      {/* <div className="prompt">
        <p className='userMessage'>User Message</p>
      </div>

      <div className="AIReply">
        <p className='AImessage'>AI Message</p>
      </div> */}

    </div>
    </>
  )
}
