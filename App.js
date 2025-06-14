import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';
import { PaperProvider } from 'react-native-paper'
import { BookmarksProvider, useBookmarks} from "./src/context/BookmarksContext"

function Root() {
  const { loadBookmarks } = useBookmarks();

  useEffect(() => {
    loadBookmarks();
  }, []);

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <BookmarksProvider>
      <PaperProvider>
        <Root />
      </PaperProvider>
    </BookmarksProvider>
  );
}