import * as React from 'react'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView, ScrollView } from 'react-native'

const Home: React.FC = () => {
  const { navigate } = useNavigation()

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Container>
          <Title>Other Screen!</Title>

          <Button
            title="Back Home"
            onPress={() => navigate('Home')}
            color="#200741"
          />
        </Container>
      </ScrollView>
    </SafeAreaView>
  )
}

const Container = styled.View`
  padding: 5px;
  align-items: center;
`

const Title = styled.Text`
  margin-bottom: 5px;
`

const Button = styled.Button`
  margin-top: 10px;
`

export default Home
