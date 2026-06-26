import React, { useContext } from 'react'
import './chat.css'
import { myContext } from '../../Context'

export default function Chat() {

  const {reply} = useContext(myContext)
  return (
    <div className='chatBox'>

      <div className="promot">
        <p>hello</p>
      </div>

      <div className="AIReply">
        <p>hey</p>
      </div>

    </div>
  )
}
