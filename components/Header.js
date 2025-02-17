import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Calender from '../assets/calendar.png'

export default function Header() {
  return (
    <View style={MenuStyle.container}>
        <Text style={MenuStyle.header}>To Do App</Text>
        <Image style={MenuStyle.image} source={Calender}/> 
    </View>
  )
}

const MenuStyle = StyleSheet.create({
    container: {
        marginTop: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 35,
        backgroundColor: '#6200ea',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    image: {
        width: 50,
        height: 50,
    }
})