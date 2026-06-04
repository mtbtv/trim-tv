import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Switch, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store/useStore';
import { providerManager } from '../providers/manager';
import { Provider } from '../types';

export default function ProvidersScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { providers, setProviders } = useStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProvider, setNewProvider] = useState({
    id: '',
    name: '',
    url: '',
    type: 'html' as const,
  });

  const handleAddProvider = async () => {
    if (!newProvider.id || !newProvider.name || !newProvider.url) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const provider: Provider = {
        ...newProvider,
        enabled: true,
      };

      await providerManager.addProvider(provider);
      const updatedProviders = providerManager.getProviders();
      setProviders(updatedProviders);

      setNewProvider({ id: '', name: '', url: '', type: 'html' });
      setShowAddForm(false);
      Alert.alert('Success', 'Provider added successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to add provider');
      console.error(error);
    }
  };

  const handleToggleProvider = async (providerId: string) => {
    try {
      providerManager.toggleProvider(providerId);
      const updatedProviders = providerManager.getProviders();
      setProviders(updatedProviders);
    } catch (error) {
      Alert.alert('Error', 'Failed to toggle provider');
    }
  };

  const handleRemoveProvider = async (providerId: string) => {
    Alert.alert('Remove Provider', 'Are you sure you want to remove this provider?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: async () => {
          try {
            await providerManager.removeProvider(providerId);
            const updatedProviders = providerManager.getProviders();
            setProviders(updatedProviders);
          } catch (error) {
            Alert.alert('Error', 'Failed to remove provider');
          }
        },
      },
    ]);
  };

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
        <Text className="text-white text-2xl font-bold flex-1">Manage Providers</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Add Provider Button */}
        <View className="px-8 py-4">
          <TouchableOpacity
            onPress={() => setShowAddForm(!showAddForm)}
            className="bg-accent rounded-lg px-6 py-4 flex-row items-center justify-center gap-2"
          >
            <Ionicons name="add-circle" size={24} color="white" />
            <Text className="text-white font-bold text-lg">Add Provider</Text>
          </TouchableOpacity>
        </View>

        {/* Add Provider Form */}
        {showAddForm && (
          <View className="px-8 py-4 bg-primary mx-8 rounded-lg mb-4">
            <Text className="text-white font-bold mb-4">New Provider</Text>

            <TextInput
              placeholder="Provider ID (e.g., myprovider1)"
              placeholderTextColor="#999"
              value={newProvider.id}
              onChangeText={(text) => setNewProvider({ ...newProvider, id: text })}
              className="bg-secondary text-white px-4 py-3 rounded-lg mb-3"
            />

            <TextInput
              placeholder="Provider Name"
              placeholderTextColor="#999"
              value={newProvider.name}
              onChangeText={(text) => setNewProvider({ ...newProvider, name: text })}
              className="bg-secondary text-white px-4 py-3 rounded-lg mb-3"
            />

            <TextInput
              placeholder="Provider URL"
              placeholderTextColor="#999"
              value={newProvider.url}
              onChangeText={(text) => setNewProvider({ ...newProvider, url: text })}
              className="bg-secondary text-white px-4 py-3 rounded-lg mb-3"
            />

            <View className="flex-row gap-2 mb-4">
              {(['html', 'json', 'api'] as const).map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setNewProvider({ ...newProvider, type })}
                  className={`flex-1 py-2 rounded ${
                    newProvider.type === type ? 'bg-accent' : 'bg-secondary'
                  }`}
                >
                  <Text className="text-white text-center font-semibold uppercase text-xs">
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className="flex-row gap-2">
              <TouchableOpacity
                onPress={() => setShowAddForm(false)}
                className="flex-1 bg-secondary rounded-lg py-3"
              >
                <Text className="text-white text-center font-semibold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAddProvider}
                className="flex-1 bg-accent rounded-lg py-3"
              >
                <Text className="text-white text-center font-semibold">Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Providers List */}
        <View className="px-8 py-4">
          <Text className="text-white text-xl font-bold mb-4">
            Providers ({providers.length})
          </Text>

          {providers.length === 0 ? (
            <View className="bg-primary rounded-lg px-6 py-8 items-center">
              <Ionicons name="plug-outline" size={48} color="#666" />
              <Text className="text-gray-400 mt-4 text-center">
                No providers added yet. Add one to get started!
              </Text>
            </View>
          ) : (
            providers.map((provider) => (
              <View key={provider.id} className="bg-primary rounded-lg px-6 py-4 mb-4">
                <View className="flex-row items-center justify-between mb-2">
                  <View className="flex-1">
                    <Text className="text-white font-bold text-lg">{provider.name}</Text>
                    <Text className="text-gray-400 text-sm">{provider.url}</Text>
                  </View>
                  <Switch
                    value={provider.enabled}
                    onValueChange={() => handleToggleProvider(provider.id)}
                  />
                </View>

                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2">
                    <Ionicons name="folder" size={16} color="#666" />
                    <Text className="text-gray-400 text-xs">
                      {provider.itemCount || 0} items
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => handleRemoveProvider(provider.id)}>
                    <Ionicons name="trash" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
