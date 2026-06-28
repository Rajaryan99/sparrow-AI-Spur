import { React, useEffect, useContext } from 'react'
import './sidebar.css'
import icon from '../../assets/favicon.png'
import { myContext } from '../../Context'

export default function SideBar() {

  const { allThreads, setAllThreads, currThreadId, setCurrThreadId, setNewChat, setPrevChats } = useContext(myContext)

  const getAllThreads = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/all/threads")
      const res = await response.json()
      setAllThreads(res)
    } catch (error) {
      console.error("all Thread error: ", error)
    }
  }

  const deleteThread = async (e, threadId) => {
    e.stopPropagation()
    try {
      await fetch(`http://localhost:3000/api/thread/${threadId}`, {
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
            onClick={() => setCurrThreadId(thread.id)}
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


































// import {React,  useEffect } from 'react'
// import './sidebar.css'
// import  icon from '../../assets/favicon.png'
// import { useContext } from 'react'
// import { myContext } from '../../Context'

// export default function SideBar() {

//   const {allThreads, setAllThreads, currThreadId} = useContext(myContext)

// const getAllThreads = async () => {

//   try {

//     const response = await fetch("http://localhost:3000/api/all/threads")
//     const res  = await response.json()

//     const filterData = res.map()


//     console.log(res)
    
//   } catch (error) {

//     console.log("Get all Thread error: ", error)
//     console.error("all Thread error: ", error)
    
//   }

// }

// useEffect(() => {
//   getAllThreads()

// }, [currThreadId])

//   return (
//     <section className='sidebar'>


//       <div className='logo' >
//         <img src={icon} className='icon' alt="" />
//         <h2>AI Assistent</h2>
//       </div>
     

//       <ul className='history'>
//         <p>Recent History</p>
//         <li> <i className="fa-regular fa-comment"></i> nkdj,</li>
//         <li><i className="fa-regular fa-comment"></i> ndkl</li>
//         <li><i className="fa-regular fa-comment"></i> lkdj</li>
//         <li><i className="fa-regular fa-comment"></i> nclkd</li>
//       </ul>

//  <button className='newChatBtn'>
//               <h3>New Chat</h3> 
//      </button>

//     </section>
//   )
// }
