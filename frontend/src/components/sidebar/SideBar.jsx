import React from 'react'
import './sidebar.css'
import  icon from '../../assets/favicon.png'

export default function SideBar() {
  return (
    <section className='sidebar'>


      <div className='logo' >
        <img src={icon} className='icon' alt="" />
        <h2>AI Assistent</h2>
      </div>
     

      <ul className='history'>
        <li>nkdj,</li>
        <li>ndkl</li>
        <li>lkdj</li>
        <li>nclkd</li>
      </ul>

 <button className='newChatBtn'>
              <h3>New Chat</h3> 
     </button>

    </section>
  )
}
