import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Todo from './screens/Todo';
import Done from './screens/Done';
import Splash from './screens/Splash';
import Task from './screens/Task';
import Expocamera from './screens/Expocamera';
import {Provider} from 'react-redux';
import Store from './redux/store';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'To-Do') {
            iconName = 'book';
            size = focused ? 25 : 20;
            color = 'white';
          } else if (route.name === 'Done') {
            iconName = 'checkmark-done-outline';
            size = focused ? 25 : 20;
            color = 'white';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveBackgroundColor: 'purple',
        tabBarInactiveBackgroundColor: 'grey',
        tabBarLabelStyle: {color: 'white'},
      })}>
      <Tab.Screen
        name={'To-Do'}
        component={Todo}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={'Done'}
        component={Done}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

const RootStack = createStackNavigator();

function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Splash"
          options={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontSize: 25,
            },
          }}>
          <RootStack.Screen
            name="Splash"
            component={Splash}
            options={{
              headerShown: false,
            }}
          />


          <RootStack.Screen
            name="Expocamera"
            component={Expocamera}
            options={{
              headerShown: false,
            }}
          />

          <RootStack.Screen
            name="Task"
            component={Task}
            options={{
              headerShown: true,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#A020F0',
              },
              headerTitleStyle:{
                color:'#fff'
              },
              headerBackTitleStyle:{
                color:'#fff'
              },
              gestureDirection:'horizontal'
            }}
          />
          <RootStack.Screen
            name="My Tasks"
            component={HomeTabs}
            options={{
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: 'purple',
              },
              headerTitleStyle: {
                color: 'white',
              },
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
