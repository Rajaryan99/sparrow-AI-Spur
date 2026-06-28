import React, { useContext, useEffect, useState } from 'react'
import './chat.css'
import { myContext } from '../../Context'
import ReactMarkdown from 'react-markdown'

export default function Chat() {



  const {reply, prevChats, setPrevChats, newChat, setNewChat, isNewReply, setIsNewReply} = useContext(myContext)
  const [latestReply, setLatestReply] = useState(null)


useEffect(() => {
  if (!prevChats?.length) return;

  const lastMessage = prevChats[prevChats.length - 1];
  if (!lastMessage || lastMessage.role !== 'assistant') return;
  if (!lastMessage.content) return;

  // only animate if it's a fresh AI reply
  if (!isNewReply) {
    setLatestReply(lastMessage.content);  // just show it instantly
    return;
  }

  const content = lastMessage.content.split(" ");
  let idx = 0;
  setLatestReply("");

  const interval = setInterval(() => {
    setLatestReply(content.slice(0, idx + 1).join(" "))
    idx++;
    if (idx >= content.length) {
      clearInterval(interval)
      setIsNewReply(false)  // reset flag
    }
  }, 40)

  return () => clearInterval(interval)

}, [prevChats])

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
