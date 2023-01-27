import React from 'react'
import { Loading as Icon } from 'tdesign-react'

const Loading: React.FC = () => {
  return (
    <div style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Icon/>
    </div>
  )
}

export default Loading
