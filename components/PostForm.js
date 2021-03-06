import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavBar from './NavBar';
import tw from 'twrnc'

const PostForm = () => {
  return (
    <View style={tw`px-3 pt-4 w-full h-full justify-between`}>
      <Text style={tw`text-xl font-semibold`}>PostForm</Text>
      <NavBar />
    </View>
  )
}

export default PostForm

const styles = StyleSheet.create({})