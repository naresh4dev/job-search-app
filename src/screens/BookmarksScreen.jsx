import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { useBookmarks } from '../context/BookmarksContext';
import JobCard from '../components/JobCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider } from 'react-native-paper';
export default function BookmarksScreen({ navigation }) {
  const { bookmarks } = useBookmarks();

  if (bookmarks.length === 0)
    return (
      <View style={styles.center}>
        <Text>No bookmarks yet.</Text>
      </View>
    );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Bookmarked Jobs</Text>
        </View>
      <Divider/>  
      <FlatList
        data={bookmarks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
        <JobCard job={item} navigateToJobDetails={job => navigation.navigate('JobDetails', { job })} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});