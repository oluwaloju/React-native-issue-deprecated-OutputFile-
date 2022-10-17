import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { setTaskID, setTasks } from '../redux/actions';
import CheckBox from '@react-native-community/checkbox';
import * as Animatable from 'react-native-animatable';
import {useFonts, Chango_400Regular, Charmonman_400Regular} from '@expo-google-fonts/dev'



export default function Todo({navigation}) {
  const { Tasks } = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  const [filteredTask, setFilteredTask] = useState([]);

  useEffect(() => {
      navigation.addListener('focus', () => {
          getTasks();
      });
  }, [])

  const getTasks = () => {
      AsyncStorage.getItem('Tasks')
          .then(Tasks => {
              const parsedTasks = JSON.parse(Tasks);
              if (parsedTasks && typeof parsedTasks === 'object') {
                  dispatch(setTasks(parsedTasks));
                  setFilteredTask(parsedTasks.filter(task => task.Done === false));
              }
          })
          .catch(err => console.log(err))
  }

  const deleteTask = (id) => {
      const filteredTasks = Tasks.filter(task => task.ID !== id);
      AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
          .then(() => {
              dispatch(setTasks(filteredTasks));
              setFilteredTask(filteredTasks.filter(task => task.Done === false));
              Alert.alert('Success!', 'Task removed successfully.');
          })
          .catch(err => console.log(err))
  }

  const checkTask = (id, newValue) => {
      const index = Tasks.findIndex(task => task.ID === id);
      if (index > -1) {
          let newTasks = [...Tasks];
          newTasks[index].Done = newValue;
          AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
              .then(() => {
                  dispatch(setTasks(newTasks));
                  setFilteredTask(newTasks.filter(task => task.Done === false));
                  Alert.alert('Hurray!', 'You have completed your task🎉');
              })
              .catch(err => console.log(err))
      }
  }


  return (
    <View style={styles.container}>
    <FlatList
    data={filteredTask}  //this filters the task to only display Tasks unchecked i.e done=false
    renderItem={({item})=>(
      <TouchableOpacity
       style={styles.item}
       onPress={()=>{
       dispatch(setTaskID(item.ID))
       navigation.navigate('Task')}}>
        <View style={styles.item_row}>
          <View 
          style={[
            {
                  backgroundColor: 
                  item.Color==='red'? '#FF0000':
                  item.Color==='yellow'? '#FFFF00':
                  item.Color==='blue'? '#87CEEB':'#ffff'
            },
            styles.color]}/>

          <CheckBox
          value={item.Done}
          boxType='circle'
          onValueChange={(newValue)=>{checkTask(item.ID, newValue)}}
          />
          <View style={styles.item_body}>
            <Text style={styles.title} numberOfLines={1}>{item.Title}</Text>
            <Text style={styles.taskdescription} numberOfLines={1}>{item.Desc}</Text>
          </View>
          <TouchableOpacity
          style={styles.delete}
          onPress={()=>{deleteTask(item.ID)}}
          > 
            <Ionicons
            name={"trash-outline"}
            size={25}
            color={"#fff"}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )}
    keyExtractor={(item, index)=>index.toString()}
    />
    <Animatable.View animation="pulse" easeing="ease-in-back" iterationCount="infinite" direction="alternate" iterationDelay={3000}>
     <TouchableOpacity
      style={styles.button}
      onPress={()=>{
        dispatch(setTaskID(Tasks.length+1)) //we can't use item.id because item,id,  uses data={filteredTasks} which doesn't contain the full objects within Tasks. So we use Tasks
        navigation.navigate("Task")
      }}
      >
      <Ionicons
      name={"add-outline"}
      color={"white"}
      size={40}
      />
     </TouchableOpacity>
     </Animatable.View>
     
     
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    backgroundColor: 'black',
    flex:1
  },
  text:{
    color:"white"
  },
  button:{
    width:60,
    height:60,
    borderRadius:30,
    backgroundColor:"purple",
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom:30,
    right:10,
    elevation:20
  },
  delete:{
   width:50,
   height:50,
   justifyContent: 'center',
   alignItems: 'center',
  },
  item:{
    marginHorizontal:10,
    marginVertical:7,
    paddingRight:10,
    backgroundColor:'#BF40BF',
    justifyContent: 'center',
    borderRdius:10,
    elevation:5,
  },
  color:{
    width:20,
    height:100,
  },
  title:{
    color:'#ffff',
    fontSize: 30,
    margin:5,
    fontFamily:"TradeWinds-Regular"
  },
  taskdescription:{
    color:'#ffff',
    fontSize: 15,
    margin:5,
    fontFamily:"Charmonman_400Regular"
  },
  item_row:{
    flexDirection:'row',
    alignItems: 'center'
  },
  item_body:{
    flex:1
  }
})