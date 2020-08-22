import React, { HTMLAttributes } from 'react'

const HelloWorld: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
  return <div {...props}>Hello, world!</div>
}

export default HelloWorld
