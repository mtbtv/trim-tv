import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';

export default function HomeScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { allMedia, setAllMedia } = useStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      // Content will be loaded from providers
      const media = allMedia;
      setAllMedia(media);
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 1, title: 'Trending', icon: 'flame' },
    { id: 2, title: 'Latest', icon: 'time' },
    { id: 3, title: 'Popular', icon: 'star' },
    { id: 4, title: 'My List', icon: 'bookmark' },
  ];

  return (
    <View
      className="flex-1 bg-secondary"
      style={{ paddingLeft: insets.left, paddingRight: insets.right }}
    >
      {/* Header */}
      <View className="bg-primary px-8 py-6 flex-row items-center justify-between">
        <Text className="text-white text-3xl font-bold">Trim TV</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings" size={32} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View className="px-8 py-6">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="gap-4"
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                className="bg-primary rounded-lg px-6 py-4 flex-row items-center gap-2 mr-4"
              >
                <Ionicons name={cat.icon as any} size={24} color="#ef4444" />
                <Text className="text-white font-semibold">{cat.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Providers Status */}
        <View className="px-8 py-4">
          <TouchableOpacity
            onPress={() => navigation.navigate('Providers')}
            className="bg-primary rounded-lg px-6 py-4 flex-row items-center justify-between"
          >
            <View className="flex-row items-center gap-2">
              <Ionicons name="plug" size={24} color="#ef4444" />
              <Text className="text-white font-semibold">Manage Providers</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Content Grid */}
        {allMedia.length > 0 ? (
          <View className="px-8 py-6">
            <Text className="text-white text-2xl font-bold mb-6">
              Available Content
            </Text>
            <View className="flex-row flex-wrap gap-4">
              {allMedia.slice(0, 8).map((media) => (
                <TouchableOpacity
                  key={media.id}
                  onPress={() => navigation.navigate('Details', { id: media.id })}
                  className="bg-primary rounded-lg w-40 h-56 justify-center items-center overflow-hidden"
                >
                  {media.thumbnail ? (
                    <Text className="text-white text-xs text-center px-2">
                      {media.title}
                    </Text>
                  ) : (
                    <>
                      <Ionicons name="image" size={48} color="#666" />
                      <Text className="text-white text-xs mt-2 text-center px-2">
                        {media.title}
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <View className="px-8 py-12 justify-center items-center">
            <Ionicons name="cloud-offline" size={64} color="#666" />
            <Text className="text-gray-400 mt-4">
              No providers configured. Add providers in Settings.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
