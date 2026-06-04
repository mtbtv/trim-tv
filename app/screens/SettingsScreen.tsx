import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store/useStore';
import { providerManager } from '../providers/manager';

export default function SettingsScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { providers } = useStore();

  useEffect(() => {
    providerManager.loadProviders();
  }, []);

  return (
    <View
      className="flex-1 bg-secondary"
      style={{ paddingLeft: insets.left, paddingRight: insets.right }}
    >
      {/* Header */}
      <View className="flex-row items-center gap-4 px-8 py-6 bg-primary">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold flex-1">Settings</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Providers Section */}
        <View className="px-8 py-6">
          <Text className="text-white text-xl font-bold mb-4">Providers</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Providers')}
            className="bg-primary rounded-lg px-6 py-4 flex-row items-center justify-between mb-4"
          >
            <View className="flex-row items-center gap-3">
              <Ionicons name="plug" size={24} color="#ef4444" />
              <View>
                <Text className="text-white font-semibold">Manage Providers</Text>
                <Text className="text-gray-400 text-sm">{providers.length} providers</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Display Section */}
        <View className="px-8 py-6">
          <Text className="text-white text-xl font-bold mb-4">Display</Text>

          <View className="bg-primary rounded-lg px-6 py-4 mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Ionicons name="moon" size={24} color="#fbbf24" />
              <Text className="text-white font-semibold">Dark Mode</Text>
            </View>
            <Switch value={true} disabled />
          </View>

          <View className="bg-primary rounded-lg px-6 py-4 flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Ionicons name="contrast" size={24} color="#06b6d4" />
              <Text className="text-white font-semibold">HD Quality</Text>
            </View>
            <Switch value={true} />
          </View>
        </View>

        {/* Playback Section */}
        <View className="px-8 py-6">
          <Text className="text-white text-xl font-bold mb-4">Playback</Text>

          <View className="bg-primary rounded-lg px-6 py-4 mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Ionicons name="volume-high" size={24} color="#10b981" />
              <Text className="text-white font-semibold">Subtitles</Text>
            </View>
            <Switch value={true} />
          </View>

          <View className="bg-primary rounded-lg px-6 py-4 flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Ionicons name="speedometer" size={24} color="#8b5cf6" />
              <Text className="text-white font-semibold">Playback Speed</Text>
            </View>
            <Text className="text-gray-400">1.0x</Text>
          </View>
        </View>

        {/* Storage Section */}
        <View className="px-8 py-6">
          <Text className="text-white text-xl font-bold mb-4">Storage</Text>

          <TouchableOpacity className="bg-primary rounded-lg px-6 py-4 flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-3">
              <Ionicons name="trash" size={24} color="#ef4444" />
              <Text className="text-white font-semibold">Clear Cache</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity className="bg-primary rounded-lg px-6 py-4 flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Ionicons name="close-circle" size={24} color="#ef4444" />
              <Text className="text-white font-semibold">Clear Downloads</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View className="px-8 py-6">
          <Text className="text-white text-xl font-bold mb-4">About</Text>

          <View className="bg-primary rounded-lg px-6 py-4">
            <View className="mb-3 pb-3 border-b border-gray-600">
              <Text className="text-gray-400 text-sm">App Version</Text>
              <Text className="text-white font-semibold mt-1">1.0.0</Text>
            </View>
            <View>
              <Text className="text-gray-400 text-sm">Build</Text>
              <Text className="text-white font-semibold mt-1">2026.06.04</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
