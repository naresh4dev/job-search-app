import { FlatList, StyleSheet, Text, View, RefreshControl } from 'react-native'
import React, {useCallback, useState, useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingIndicator from '../components/LoadingIndicator';
import { fetchJobs } from '../services/api';
import ErrorScreen from './ErrorScreen';
import JobCard from '../components/JobCard';
import { useNavigation } from '@react-navigation/native';
import { Divider, Snackbar } from 'react-native-paper';
const JobScreen = () => {
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [allJobsFetched, setAllJobsFetched] = useState(false);
  const [snackVisble, setSnackVisible] = useState(true);
  const loadJobs = async (reset = false) => {
    if ((loading || allJobsFetched) && !refreshing ) return;
    setLoading(true);
    try {
      const newJobs = await fetchJobs(reset? 1: page);
      console.log("Fetched Jobs");
      if (newJobs.length === 0) {
        setAllJobsFetched(true);
      } else {
        if (reset) {
          setAllJobsFetched(false);
        }
        setJobs(prevJobs => reset ? newJobs : [...prevJobs, ...newJobs]);
        setPage(prevPage => reset ? 2 : prevPage + 1);
      }      
    } catch (err) {
      console.error('Error loading jobs:', err);
      setError(err.message || 'Failed to load jobs');
    } finally {
      setLoading(false);
      if (refreshing) {
        setRefreshing(false);
      }
    }
    
  };

  useEffect(() => {
    // Only run once on mount
    loadJobs(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const renderItem = React.useCallback(
  ({ item }) => (
    (item?.id && <JobCard job={item} navigateToJobDetails={job => navigation.navigate('JobDetails', { job })} snackVisble={snackVisble} />)
  ),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [navigation]
);
  const onEndReached = () => {if(!loading) loadJobs()};
  const onRefresh = () =>{setRefreshing(true); loadJobs(true);}
  if (loading && jobs.length === 0) {
    return <LoadingIndicator />;
  }
  if (error) {
    return (
      <ErrorScreen
        message={error}
        onRetry={() => {
          setError(null);
          loadJobs(true);
        }}
      />
    )
  }
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Job Listings</Text>
      </View>
      <Divider/>
    <FlatList
      data={jobs}
      keyExtractor={(item,index) => index.toString()}
      renderItem={renderItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      ListEmptyComponent={() => <Text style={styles.center}>No jobs found.</Text>}
      ListFooterComponent={loading && !allJobsFetched  ? <LoadingIndicator /> : <Text style={styles.textCenter}>No more job posts available</Text>}
      style={{backgroundColor:"#FAFAFA"}}
    />
    </SafeAreaView>
  )
}

export default JobScreen

const styles = StyleSheet.create({
  textCenter : {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
    marginBottom: 100
  }
})