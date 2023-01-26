import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './UserAttach.less'

const UserAttach = () => {
  const [dropState, setDropState] = useState([false, false])

  const dropClick = (e: any, dropIdx: number) => {
    const drop_ = JSON.parse(JSON.stringify(dropState))
    drop_[dropIdx] = !drop_[dropIdx]
    setDropState(drop_)
  }

  return (
    <div className="user_attach_container">
      <div className="row">
        <div className="content">
          提问数 <span>xx</span>
        </div>
        <div className="drop">
          <div className="drop_control" onClick={(e) => {
            dropClick(e, 0)
          }}>
            <div className={dropState[0] ? 'tran_active' : 'tran'}>
            </div>
            <p> {dropState[0] ? '合上' : '展开'}</p>
          </div>
          <div className="dropmenu"
               style={
                 {
                   display: `${dropState[0] ? 'block' : 'none'}`
                 }
               }
          >
            <div className="menu_row">
              <Link to='/problem'>提问1</Link>
            </div>
            <div className="menu_row">
              <Link to='/problem'>提问2</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="content">
          回答数 <span>xx</span> <span>采纳数 xx</span>
        </div>
        <div className="drop">
          <div className="drop_control" onClick={(e) => {
            dropClick(e, 1)
          }}>
            <div className={dropState[1] ? 'tran_active' : 'tran'}>
            </div>
            <p> {dropState[1] ? '合上' : '展开'}</p>
          </div>
          <div className="dropmenu"
               style={
                 {
                   display: `${dropState[1] ? 'block' : 'none'}`
                 }
               }
          >
            <div className="menu_row">
              回答1
            </div>
            <div className="menu_row">
              回答2
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="content">
          音视频协作数 <span>xx</span>
        </div>
      </div>

    </div>
  )
}

export default UserAttach
