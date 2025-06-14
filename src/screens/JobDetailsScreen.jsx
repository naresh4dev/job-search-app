import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    Image,
    Linking,
    TouchableOpacity,
    Dimensions,
    Share
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { Appbar, Divider } from 'react-native-paper';
import { useBookmarks } from '../context/BookmarksContext';
const { width } = Dimensions.get('window');

export default function JobDetailScreen({ route }) {
    const { job } = route.params;
    const navigation = useNavigation();
    const { isBookmarked, add, remove } = useBookmarks();
    const [bookmarked, setBookmarked] = useState(isBookmarked(job.id));
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
    return (<>
        <Appbar.Header style={{ backgroundColor: '#3973D6' }}>
            <Appbar.BackAction onPress={() => navigation.goBack()} color='#fff' />
            <Appbar.Content title="Job Details" color='#fff' />
            <Appbar.Action icon={bookmarked ? "heart" : "heart-outline"} size={25} color={bookmarked ? "#CA3D4D" : "#FFF"} onPress={toggleBookmark} />
            <Appbar.Action icon="share" size={25} color="#FFF" onPress={shareJob} />
            <Appbar.Action icon="phone" size={25} color="#FFF" onPress={() => (Linking.openURL(job.custom_link))} />
        </Appbar.Header>


        <View style={styles.header}>

            {job.creatives?.[0]?.file && (
                <Image source={{ uri: job.creatives[0].file }} style={styles.avatar} />
            )}

            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.companyName}>{job.company_name || job.primary_details.Company || ''}</Text>

            <View style={styles.locationRow}>
                <Ionicons name="location-sharp" size={16} color="rgba(255,255,255,0.9)" />
                <Text style={styles.locationText}>{job.primary_details.Place}</Text>
            </View>
        </View>
        <View style={styles.metaCard}>
            {job.primary_details.Salary !== '-' && (
                <>
                    <View style={styles.metaItem}>
                        <Text style={styles.metaLabel}>Salary</Text>
                        <Text style={styles.metaValue}>{job.primary_details.Salary}</Text>
                    </View>
                    <Divider style={{ width: 1, height: '70%', backgroundColor: '#E0E0E0', marginVertical: "auto", marginHorizontal: 4 }} />
                </>
            )}
            <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Job Type</Text>
                <Text style={styles.metaValue}>{job.job_role || '—'}</Text>
            </View>
            <Divider style={{ width: 1, height: '70%', backgroundColor: '#E0E0E0', marginVertical: "auto", marginHorizontal: 4 }} />

            <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Level</Text>
                <Text style={styles.metaValue}>{job.primary_details.Experience || '—'}</Text>
            </View>
        </View>
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
        >
            <Animated.View entering={FadeInDown.duration(300)}>
                {/*Badges*/}
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
                    <View style={[styles.chip, styles.applicationChip]}>
                        <Ionicons name="people-outline" size={16} color="#6A1B9A" />
                        <Text style={styles.applicationChipText}>
                            {job.num_applications || 0} Applications
                        </Text>
                    </View>

                </View>
                <View style={styles.chipRow}>
                    <View style={[styles.chip, styles.viewsChip]}>
                        <Ionicons name="eye-outline" size={16} color="#1565C0" />
                        <Text style={styles.viewsChipText}>Views: {job.views || '0'}</Text>
                    </View>

                    <View style={[styles.chip, styles.createdChip]}>
                        <Ionicons name="calendar-outline" size={16} color="#EF6C00" />
                        <Text style={styles.createdChipText}>
                            Created On: {new Date(job.created_on).toLocaleDateString()}
                        </Text>
                    </View>
                    <View style={styles.expiredChip}>
                        <Ionicons name="alert-circle-outline" size={16} color="#fff" />
                        <Text style={styles.expiredChipText}>
                            Valid Till: {new Date(job.expire_on).toLocaleDateString()}
                        </Text>
                    </View>
                </View>
                {/* Requirements */}
                <Text style={styles.sectionHeader}>Requirements</Text>
                <View style={styles.requirementColumn}>
                    <View style={styles.requirementRow}>
                        <Text style={styles.fieldKey}>Job Category:</Text>
                        <Text style={styles.requirementText}>{job.job_category}</Text>
                    </View>
                    <View style={styles.requirementRow}>
                        <Text style={styles.fieldKey}>Qualification:</Text>
                        <Text style={styles.requirementText}>{job?.primary_details?.Qualification || "Not Available"}</Text>
                    </View>
                    <View style={styles.requirementRow}>
                        <Text style={styles.fieldKey}>Job Role:</Text>
                        <Text style={styles.requirementText}>{job?.job_role || "Not Available"}</Text>
                    </View>
                    <View style={styles.requirementRow}>
                        <Text style={styles.fieldKey}>Shift:</Text>
                        <Text style={styles.requirementText}>{job?.job_hours || "Not Available"}</Text>
                    </View>
                </View>
                {/* Job Description */}
                <Text style={styles.sectionHeader}>Job Description</Text>
                <Text style={styles.paragraph}>{job.other_details}</Text>

                {/* Contact Information */}
                <Text style={styles.sectionHeader}>Contact Preferences</Text>
                <View style={styles.contactBlock}>
                    <View style={styles.contactRow}>
                        <View style={styles.contactRow}>
                            <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
                            <Text style={styles.contactText}>{job.whatsapp_no || 'Not available'}</Text>
                        </View>
                        <View style={[styles.contactRow, { marginLeft: 15 }]}>
                            <Ionicons name="time-outline" size={18} color="#555" />
                            <Text style={styles.contactText}>Available: {job.contact_preference?.preferred_call_start_time}-{job.contact_preference.preferred_call_end_time}</Text>
                        </View>
                    </View>
                    <View style={styles.contactRow}>
                    {job?.contact_preference && (
                        <TouchableOpacity
                            style={styles.whatsappBtn}
                            onPress={() => Linking.openURL(job?.contact_preference?.whatsapp_link)}
                        >
                            <Ionicons name="chatbubble-ellipses-outline" size={18} color="#fff" />
                            <Text style={styles.whatsappBtnText}>Chat on WhatsApp</Text>
                        </TouchableOpacity>
                    )}
                    {
                        job?.custom_link && <TouchableOpacity
                            style={styles.applyButton}
                            onPress={() => Linking.openURL(job.custom_link)}
                        >
                            <Text style={styles.applyText}>{job.button_text || 'Apply'}</Text>
                        </TouchableOpacity>
                    }
                    </View>

                </View>
                {/* Additional Info */}
                <Text style={styles.sectionHeader}>Additional Info</Text>
                {job.contentV3?.V3.map((field, i) => (
                    <View key={i} style={styles.requirementRow}>
                        <Text style={styles.fieldKey}>{field.field_name}:</Text>
                        <Text style={styles.requirementText}>{field.field_value}</Text>
                    </View>
                ))}

                {/* About */}

            </Animated.View>
        </ScrollView>

        {/* Apply Button */}
        <View style={styles.applyContainer}>

        </View>

    </>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1, backgroundColor: '#F5F5F5' },

    header: {
        backgroundColor: '#3973D6',
        paddingBottom: 50,
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#fff',
        marginBottom: 12,
    },
    jobTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        width: '80%',
    },
    companyName: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.5)',
        marginTop: 8,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 8,
    },
    locationText: {
        color: 'rgba(255,255,255,0.9)',
        marginLeft: 4,
        fontSize: 13,
        fontWeight: '600',
    },

    container: {
        flex: 1,
        marginTop: -12, // pull up under header curve
        paddingHorizontal: 16,
    },
    metaCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        marginTop: -40,
        marginBottom: 24,
        elevation: 4,
        zIndex: 2,
        width: "85%",
        marginHorizontal: 'auto',
    },
    metaItem: {
        alignItems: 'center',
        flex: 1,
    },
    metaLabel: {
        fontSize: 12,
        color: '#777',
        marginBottom: 4,
    },
    metaValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },

    sectionHeader: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
        marginTop: 20,
    },
    requirementRow: {
        flexDirection: 'row',
        alignItems: 'start',
        marginBottom: 10,
    },
    requirementColumn: {
        flexDirection: 'column',
        gap: 4,
    },
    requirementText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#555',
        flex: 1,
        flexWrap: 'wrap',
    },

    paragraph: {
        fontSize: 14,
        lineHeight: 20,
        color: '#555',
    },

    applyContainer: {
        position: 'absolute',
        bottom: 20,
        width,
        alignItems: 'center',
    },
    applyButton: {
        backgroundColor: '#3973D6',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 24,
        alignSelf: 'flex-end',
        marginBottom: 8,
        marginLeft: 15
    },
    applyText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    badge: {
        marginVertical: 0,
        paddingVertical: 4,
        backgroundColor: '#3973D6',
        fontSize: 12,
        paddingHorizontal: 8,
        color: '#fff',
        borderRadius: 8,
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
    chipRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 16,
        marginTop: 12,
        flexWrap: 'wrap',
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 10,
    },
    viewsChip: {
        backgroundColor: '#E3F2FD',
    },
    viewsChipText: {
        marginLeft: 6,
        fontSize: 13,
        color: '#1565C0',
    },

    createdChip: {
        backgroundColor: '#FFF3E0',
    },
    createdChipText: {
        marginLeft: 6,
        fontSize: 13,
        color: '#EF6C00',
    },
    chipText: {
        fontSize: 13,
        color: '#3973D6',
        marginLeft: 6,
    },
    expiredChip: {
        backgroundColor: '#FF4C4C',
        flexDirection: 'row',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    expiredChipText: {
        fontSize: 13,
        color: '#fff',
        marginLeft: 6,
    },
    applicationChip: {
        backgroundColor: '#F3E5F5', // light lavender purple
    },
    applicationChipText: {
        marginLeft: 6,
        fontSize: 13,
        color: '#6A1B9A', // dark purple text
    },
    contactBlock: {

        padding: 12,


    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    contactText: {
        fontSize: 14,
        marginLeft: 8,
        color: '#444',
    },
    whatsappBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#25D366',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 24,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    whatsappBtnText: {
        color: '#fff',
        marginLeft: 8,
        fontWeight: '600',
    },
});
