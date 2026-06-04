import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PlayerScreen({ navigation }: any) {
  const [showControls, setShowControls] = useState(true);

  return (
    <View className="flex-1 bg-black">
      {/* Video Player Area */}
      <View className="flex-1 bg-primary justify-center items-center">
        <Ionicons name="play-circle" size={96} color="#ef4444" />
        <Text className="text-white text-xl mt-4">Video Player</Text>
        <Text className="text-gray-400 text-sm mt-2">Content from provider</Text>
      </View>

      {/* Controls Overlay */}
      {showControls && (
        <View className="absolute inset-0 justify-between">
          {/* Top Controls */}
          <View className="flex-row items-center justify-between px-8 py-4 bg-gradient-to-b from-black/50 to-transparent">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={32} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-bold flex-1 ml-4">Video Title</Text>
          </View>

          {/* Center Controls */}
          <View className="flex-row items-center justify-center gap-16">
            <TouchableOpacity>
              <Ionicons name="play-back" size={48} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="play" size={56} color="#ef4444" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="play-forward" size={48} color="white" />
            </TouchableOpacity>
          </View>

          {/* Bottom Controls */}
          <View className="flex-row items-center justify-between px-8 py-4 bg-gradient-to-t from-black/50 to-transparent gap-4">
            <Text className="text-white text-sm">00:00</Text>
            <View className="flex-1 h-2 bg-gray-600 rounded-full" />
            <Text className="text-white text-sm">02:28</Text>
            <TouchableOpacity>
              <Ionicons name="expand" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Toggle Controls */}
      <TouchableOpacity
        className="absolute inset-0"
        onPress={() => setShowControls(!showControls)}
      />
    </View>
  );
}
