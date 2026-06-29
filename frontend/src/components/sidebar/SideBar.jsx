import { React, useEffect, useContext } from 'react'
import './sidebar.css'
import icon from '../../assets/favicon.png'
import { myContext } from '../../Context'

export default function SideBar() {

  const { allThreads, setAllThreads, currThreadId, setCurrThreadId, setNewChat, setPrevChats } = useContext(myContext)

  const getAllThreads = async () => {
    try {
      const response = await fetch("https://sparrow-ai-spur-backend.onrender.com/api/all/threads")
      const res = await response.json()
      setAllThreads(res)
    } catch (error) {
      console.error("all Thread error: ", error)
    }
  }

  const loadThread = async (threadId) => {
    try {
      setCurrThreadId(threadId)
      const response = await fetch(`https://sparrow-ai-spur-backend.onrender.com/api/${threadId}/messages`)
      const messages = await response.json()
      setPrevChats(messages)
      setNewChat(false)
    } catch (error) {
      console.error('Load thread error:', error)
    }
  }

  const deleteThread = async (e, threadId) => {
    e.stopPropagation()
    try {
      await fetch(`https://sparrow-ai-spur-backend.onrender.com/api/thread/${threadId}`, {
        method: 'DELETE'
      })
      setAllThreads(prev => prev.filter(t => t.id !== threadId))
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const handleNewChat = () => {
    setCurrThreadId(null)
    setPrevChats([])
    setNewChat(true)
  }

  useEffect(() => {
    getAllThreads()
  }, [currThreadId])

  return (
    <section className='sidebar'>

      <div className='logo'>
        <img src={icon} className='icon' alt="" />
        <h2>AI Assistant</h2>
      </div>

      <ul className='history'>
        <p>Recent History</p>
        {allThreads?.map((thread) => (
          <li
            key={thread.id}
            className={`thread-item ${currThreadId === thread.id ? 'active' : ''}`}
            onClick={() => loadThread(thread.id)}
          >
            <i className="fa-regular fa-comment"></i>
            <span>{thread.title || "New Chat"}</span>
            <i
              className="fa-solid fa-trash trash-icon"
              onClick={(e) => deleteThread(e, thread.id)}
            ></i>
          </li>
        ))}
      </ul>

      <button className='newChatBtn' onClick={handleNewChat}>
        <h3>New Chat</h3>
      </button>

    </section>
  )
}

