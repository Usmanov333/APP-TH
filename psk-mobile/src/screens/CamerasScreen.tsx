import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { fetchCameras } from '../services/api';
import { Camera } from '../services/mockData';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';

const CamerasScreen: React.FC = () => {
  const [cameras, setCameras] = useState<Camera[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [activeCamera, setActiveCamera] = useState<Camera | null>(null);
  const videoRef = useRef<Video | null>(null);
  const { width } = useWindowDimensions();

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchCameras();
      setCameras(data);
      if (!activeCamera && data.length > 0) {
        setActiveCamera(data[0]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await fetchCameras();
      setCameras(data);
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const playerHeight = Math.min((width * 9) / 16, 300);

  return (
    <View style={styles.container}>
      {activeCamera && (
        <View style={styles.playerWrapper}>
          <Video
            ref={videoRef}
            style={{ width: '100%', height: playerHeight, backgroundColor: '#000' }}
            source={{ uri: activeCamera.hlsUrl }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay
            onError={(e) => console.warn('Video error', e)}
            onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
              // no-op for now
            }}
          />
          <Text style={styles.playerTitle}>{activeCamera.name} • {activeCamera.site}</Text>
        </View>
      )}

      <FlatList
        data={cameras || []}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        style={{ marginTop: 8 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.camChip, activeCamera?.id === item.id && styles.camChipActive]}
            onPress={() => setActiveCamera(item)}>
            <Text style={[styles.camChipText, activeCamera?.id === item.id && styles.camChipTextActive]}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  playerWrapper: { padding: 12 },
  playerTitle: { marginTop: 6, marginLeft: 4, color: '#333' },
  camChip: { paddingVertical: 10, paddingHorizontal: 14, backgroundColor: '#f2f2f2', borderRadius: 999 },
  camChipActive: { backgroundColor: '#2f80ed' },
  camChipText: { color: '#333', fontWeight: '600' },
  camChipTextActive: { color: '#fff' },
});

export default CamerasScreen;