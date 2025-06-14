import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet, TouchableOpacity,View,Text, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import JobsNavigator from './JobsNavigator';

import BookmarksNavigator from './BookmarksNavigator';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

function CustomTabBarButton({ children, onPress }) {
  return (
    <TouchableOpacity
      style={{ 
        justifyContent: 'center', 
        alignItems: 'center', 
        flex: 1, }}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator 
    screenOptions={{ 
      headerShown: false, 
       // #0E0D12 Black
      tabBarShowLabel: false,
      tabBarInactiveTintColor:"#FFFFFF",
      tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          paddingBottom:5,
          paddingTop: 5,
          paddingHorizontal: 10,
          marginLeft: (width-250) / 2, // Adjust for width
          marginRight: (width-250) / 2, // Adjust for width
          elevation: 20,
          backgroundColor: '#0E0D12',
          borderRadius: 40,
          height: 60,
          width: 250,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
      },
    
    }} 
    initialRouteName='Jobs' >
      <Tab.Screen name="Jobs"
       component={JobsNavigator} 
       options={{
          title: 'Jobs',
          // tabBarIcon: ({size, color}) => <Ionicons name="briefcase" size={size} color={color}  />,
          tabBarButton: (props) => 
            <View style={{ flex: 1, alignItems: 'center' }}>
              <CustomTabBarButton {...props} />
            </View>,
          tabBarIcon: ({ focused,size,color }) => (
            <View style={focused? styles.focusedTab: styles.unfocusedTab}>
              <Ionicons name="briefcase" size={size} color={focused ? "#fff" : "#ccc"} />
              {focused && <Text style={styles.focusedText}>Jobs</Text>}
            </View>
          ),
        }}/>
      <Tab.Screen name="Bookmarks" 
      component={BookmarksNavigator} 
      options={{
          title: 'Bookmarks',
          tabBarButton: (props) => 
            <View style={{ flex: 1, alignItems: 'center' }}>
              <CustomTabBarButton {...props} />
            </View>,
          tabBarIcon: ({ focused,size,color }) => (
            <View style={focused? styles.focusedTab:styles.unfocusedTab}>
              <Ionicons name="bookmarks" size={20} color={focused ? "#fff" : "#ccc"} />
              {focused && <Text style={styles.focusedText}>Bookmarks</Text>}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  focusedTab: {
    flexDirection: 'row',
    backgroundColor: '#3973D6',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    width: 120, // Adjust width to fit text
    height: 45, // Adjust height for better touch area
    marginHorizontal: 5,
  },
  unfocusedTab: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: 80, // Adjust width for unfocused state
  },
  focusedText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
  },
});
