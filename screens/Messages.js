import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavBar from '../components/NavBar';
import { Feather } from '@expo/vector-icons';
import tw from 'twrnc'
import { TouchableOpacity } from 'react-native';
// import FontAwesome5 from '@expo/vector-icons/FontAwesome5'

const Messages = () => {
  return (
    <View style={tw`px-3 pt-4 w-full h-full justify-between`}>
      <View style={tw`flex flex-row justify-between items-center`}>
        <Text style={tw`text-xl font-semibold`}>Messages</Text>
        <TouchableOpacity>
         <Feather name="edit" size={14} color="black" />
        </TouchableOpacity>
      </View>
      <NavBar />
    </View>
  )
}

export default Messages

const styles = StyleSheet.create({})