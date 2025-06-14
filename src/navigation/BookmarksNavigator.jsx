import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import BookmarksScreen from '../screens/BookmarksScreen'
import JobDetailsScreen from '../screens/JobDetailsScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import ErrorScreen from '../screens/ErrorScreen'

const Stack = createNativeStackNavigator();


const BookmarksNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="BookmarksList" screenOptions={{headerShown:false}}>
      <Stack.Screen name="BookmarksList" component={BookmarksScreen} />
      <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} />
      <Stack.Screen name="Error" component={ErrorScreen} />
    </Stack.Navigator>
  )
}

export default BookmarksNavigator