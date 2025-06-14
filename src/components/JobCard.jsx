import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Share, Linking } from 'react-native';
import { Card, IconButton, Button, Icon, Divider } from 'react-native-paper';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';
import { useBookmarks } from '../context/BookmarksContext';
import { getTimeAgo } from '../utils/dateFormater';


const JobCard = React.memo(({ job, navigateToJobDetails }) => {
  const { isBookmarked, add, remove } = useBookmarks();
  const [bookmarked, setBookmarked] = useState(isBookmarked(job.id));
  const {timeAgo, recent} = getTimeAgo(job?.created_on);  
  const toggleBookmark = () => {
    if (bookmarked) {
      remove(job.id);
    } else {
      add(job);
    }
    setBookmarked(!bookmarked);
  };

  const shareJob = () => {
    Share.share({
      message: `${job.title} in ${job.primary_details?.Place} – see details:\n${job.custom_link}`,
    });
  };

  return (
    <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(200)} layout={Layout.springify()}>
      <Card 
      mode='elevated' 
      elevation={1} 
      style={styles.card}  
      onPress={()=>navigateToJobDetails(job)}
      >

        <Card.Title 
            titleNumberOfLines={2}  
            title={job?.title}
            titleVariant='titleMedium'
            titleStyle={{ fontSize: 16, fontWeight: 'bold' }} 
            subtitle={job?.company_name}
            right={(props)=>(
              <IconButton
              icon={bookmarked ? "heart" : "heart-outline"}
              onPress={toggleBookmark}
              iconColor={bookmarked? "#CA3D4D":"#000"}
              style={{position:"absolute", top:-45,right:-10, zIndex:1}}
              
            />
            )} 
            style={styles.cardTitle}
        />
        <Card.Content>
          {
            job?.primary_details?.Salary !=='-' &&
            <View style={styles.row}>
            <Text style={styles.salaryText}>{job?.primary_details?.Salary}</Text>
          </View>
          }
            <View style={styles.row}>
                <View style={styles.centerRow}>
                  <Icon
                    source="map-marker"
                    size={15}
                  />
                  <Text style={styles.detailText}> {job?.primary_details?.Place}</Text>               
                </View>
                
                <View style={styles.centerRow}>
                    <Icon
                      source="clock-time-eight-outline"
                      size={12}
                    />
                    <Text style={{color:recent?"#01754":"#888"}}>Posted {timeAgo}</Text>       
                </View>
                
          </View>
          <View style={styles.tagsRow}>
            {
            job.is_premium && 
              <Text style={styles.badge} >{"PREMIUM"}</Text>
            }
            {job?.job_tags?.map((tag, idx) => (
                <Text key={idx} style={[styles.tagText, { color: tag.text_color }, { backgroundColor: tag.bg_color }]}>
                {tag.value}
                </Text>
              
            ))}
          </View>
        </Card.Content>
        <Divider style={{ marginTop: 8, width:"80%", marginHorizontal:"auto" }} />
        <Card.Actions style={styles.actions}>
          
          <View style={styles.centerRow}>
            <IconButton icon="share-variant-outline" onPress={shareJob} />
             <Text> Share </Text>       
          </View>
          <Divider style={{width:1, height:"60%"}}/>
          <View>
            <Button
            mode="contained"
            style={styles.applyButton}
            labelStyle={styles.applyText}
            onPress={() => Linking.openURL(job.custom_link)}
            >
            {job.button_text}
            </Button>       
          </View>
        </Card.Actions>
      </Card>
      </Animated.View>
  );
});
JobCard.displayName = 'JobCard';

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 4,
    backgroundColor: '#fff',
  },
  cardTitle: {
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap:4
  },
  centerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:2,
  },
  badge : {
    marginVertical: 0,
    paddingVertical:4,
    backgroundColor: '#3973D6',
    fontSize:12,
    paddingHorizontal: 8,
    color: '#fff',
    borderRadius: 8,
  },
  salaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0E0D12',
  },
  detailText: {
    fontSize: 13,
    color: '#555',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 4,
  },
  tagText: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: '500',
  },
  actions: {
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 8,
    gap: 2
  },
  applyButton: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 30,
    fontSize: 15,
  },
  applyText: {
    color: '#000',
    fontWeight: '600',
  },
});

export default JobCard;
