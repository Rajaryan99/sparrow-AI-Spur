import React, { useContext, useEffect, useState } from 'react'
import './chat.css'
import { myContext } from '../../Context'
import ReactMarkdown from 'react-markdown'

export default function Chat() {



  const {reply, prevChats, setPrevChats, newChat, setNewChat} = useContext(myContext)
  const [latestReply, setLatestReply] = useState(null)


  useEffect(() => {

    if(!prevChats?.length) return;

    const content = reply.split(" ");

    let idx = 0;
    const intervel = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(" "))

      idx++;
      if(idx >= content.length) clearInterval(intervel)

    }, 40)

    return () => clearInterval(intervel)

  }, [prevChats, reply])

  return (
    <>
    {newChat && <h1>Ask your query???</h1>}
    <div className='chatBox'>

      {
        prevChats?.slice(0, -1).map((chat, idx) => 
          <div className={chat.role === "user"? "prompt": "AIReply"} key={idx}>
                  {
                    chat.role === "user"? 
                    <p className='userMessage'>{chat.content}</p>: 
                    <ReactMarkdown>{chat.content}</ReactMarkdown>
                  }
          </div>

        )
      }


      {

        prevChats.length > 0 && latestReply !== null && 
        <div className="AIReply" key={"typing"}>
               <ReactMarkdown>{latestReply}</ReactMarkdown>
        </div>


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
