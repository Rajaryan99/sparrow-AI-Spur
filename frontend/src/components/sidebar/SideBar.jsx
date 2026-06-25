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
        <p>Recent History</p>
        <li> <i class="fa-regular fa-comment"></i> nkdj,</li>
        <li><i class="fa-regular fa-comment"></i> ndkl</li>
        <li><i class="fa-regular fa-comment"></i> lkdj</li>
        <li><i class="fa-regular fa-comment"></i> nclkd</li>
      </ul>

 <button className='newChatBtn'>
              <h3>New Chat</h3> 
     </button>

    </section>
  )
}
