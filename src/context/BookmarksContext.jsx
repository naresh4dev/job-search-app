import React, { createContext, useContext ,useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookmarksContext = createContext();

export const BookmarksProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  const loadBookmarks = async () => {
    const saved = await AsyncStorage.getItem('bookmarks');
    if (saved) setBookmarks(JSON.parse(saved));
  };

  const add = async job => {
    const updated = [...bookmarks, job];
    setBookmarks(updated);
    await AsyncStorage.setItem('bookmarks', JSON.stringify(updated));
  };

  const remove = async id => {
    const updated = bookmarks.filter(j => j.id !== id);
    setBookmarks(updated);
    await AsyncStorage.setItem('bookmarks', JSON.stringify(updated));
  };

  const isBookmarked = id => bookmarks.some(j => j.id === id);

  return (
    <BookmarksContext.Provider value={{ bookmarks, loadBookmarks, add, remove, isBookmarked }}>
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarksContext);