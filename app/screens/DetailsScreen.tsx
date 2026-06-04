import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function DetailsScreen({ navigation, route }: any) {
  const insets = useSafeAreaInsets();
  const { id } = route.params || {};

  return (
    <View
      className="flex-1 bg-secondary"
      style={{ paddingLeft: insets.left, paddingRight: insets.right }}
    >
      {/* Header */}
      <View className="flex-row items-center gap-4 px-8 py-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold flex-1">Details</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View className="w-full h-80 bg-primary mx-auto my-4 rounded-lg justify-center items-center">
          <Ionicons name="image" size={64} color="#666" />
        </View>

        {/* Content Info */}
        <View className="px-8 py-6">
          <Text className="text-white text-3xl font-bold mb-2">Content Title</Text>
          <View className="flex-row gap-4 items-center mb-6">
            <View className="flex-row items-center gap-2 bg-primary px-4 py-2 rounded">
              <Ionicons name="star" size={18} color="#fbbf24" />
              <Text className="text-white font-semibold">8.5/10</Text>
            </View>
            <Text className="text-gray-400">2024</Text>
            <Text className="text-gray-400">148 min</Text>
          </View>

          <Text className="text-gray-300 text-base leading-6 mb-6">
            This is a detailed description of the content. Add your content details,
            synopsis, cast information, and more here from your providers.
          </Text>

          {/* Action Buttons */}
          <View className="gap-4 mb-8">
            <TouchableOpacity
              onPress={() => navigation.navigate('Player', { id, title: 'Content Title' })}
              className="bg-accent rounded-lg py-4 flex-row items-center justify-center gap-2"
            >
              <Ionicons name="play" size={24} color="white" />
              <Text className="text-white text-lg font-bold">Play</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-primary rounded-lg py-4 flex-row items-center justify-center gap-2">
              <Ionicons name="download" size={24} color="white" />
              <Text className="text-white text-lg font-bold">Download</Text>
            </TouchableOpacity>
          </View>

          {/* Additional Info */}
          <Text className="text-white text-lg font-bold mb-4">Cast</Text>
          <View className="gap-3 mb-8">
            <Text className="text-gray-300">Actor Name 1</Text>
            <Text className="text-gray-300">Actor Name 2</Text>
            <Text className="text-gray-300">Actor Name 3</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
