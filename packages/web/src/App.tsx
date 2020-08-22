import React, { useEffect } from 'react'
import { HelloWorld } from '@template/shared'
import serverAPI from '~/services/serverAPI'

const App: React.FC = () => {
  useEffect(() => {
    serverAPI.get('/').then(response => console.log(response.data))
  })

  return <HelloWorld />
}

export default App
