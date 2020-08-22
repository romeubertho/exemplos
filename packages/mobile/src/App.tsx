import React from 'react'
import { StatusBar } from 'react-native'
import Routes from './routes/routes'

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#200741" animated />
      <Routes />
    </>
  )
}

export default App
