import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavBar from '../components/NavBar';

const Notification = ({navigation}) => {
  return (
    <View>
      <Text>Notification</Text>
      <NavBar navigation={navigation} />
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({})