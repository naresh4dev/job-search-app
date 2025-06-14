import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import JobsScreen from '../screens/JobsScreen'
import JobDetailsScreen from '../screens/JobDetailsScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import ErrorScreen from '../screens/ErrorScreen'

const Stack = createNativeStackNavigator();


const JobsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="JobList" screenOptions={{headerShown:false}}>
      <Stack.Screen name="JobList" component={JobsScreen} />
      <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} />
      <Stack.Screen name="Error" component={ErrorScreen} />
    </Stack.Navigator>
  )
}

export default JobsNavigator