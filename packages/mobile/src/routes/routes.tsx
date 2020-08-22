import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomePage from '../pages/Home/HomePage'
import OtherScreenPage from '../pages/OtherScreen/OtherScreenPage'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator()

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="OtherScreen"
          component={OtherScreenPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
