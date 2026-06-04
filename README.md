![Trim TV Logo](https://img.shields.io/badge/Trim%20TV-Android%20TV-blue?style=for-the-badge)

# Trim TV

Android TV streaming media app built with React Native, TypeScript, and Expo with **Provider Extension Support**.

## Features

- 🎬 Stream media content on Android TV
- 🔌 **Provider Extensions** - Add custom content sources
- 🎤 Multi-audio support
- 📺 Optimized for TV remote navigation (D-Pad)
- 📥 Download content for offline viewing
- ⭐ Watchlist functionality
- 🎨 Beautiful TV-optimized UI
- 📱 Support for external players
- 🔧 Bring your own sources
- 🆓 Ad-free streaming
- 🔍 Advanced search & filtering

## Stack

- **React Native** - Native mobile framework
- **React Native TV** - Android TV specific components
- **TypeScript** - Type safety
- **Expo** - Build and deployment platform
- **NativeWind** - Tailwind CSS for React Native
- **React Navigation** - Navigation management
- **React Query** - Data fetching and caching
- **MMKV Storage** - High-performance local storage
- **React Native Video** - Video playback engine
- **Firebase** - Analytics and crash reporting
- **Cheerio** - HTML scraping for providers
- **Zustand** - State management

## Provider System

Trim TV supports dynamic provider extensions that allow users to add their own content sources:

### Key Features:
- ✅ Add/remove/enable providers dynamically
- ✅ Multiple provider support simultaneously
- ✅ Provider configuration management
- ✅ Automatic content scraping
- ✅ Caching system for performance
- ✅ Error handling and retry logic
- ✅ Provider validation

## Prerequisites

1. **Node.js** (v18 or higher)
2. **React Native environment** - [Setup Guide](https://reactnative.dev/docs/set-up-your-environment)
3. **Android SDK** and **Android Studio**
4. **Java Development Kit (JDK)** 17 or higher

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mtbtv/trim-tv.git
cd trim-tv
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Prebuild for Android TV

```bash
npx expo prebuild -p android --clean
```

### 4. Run on Android TV

**Development:**
```bash
npm run android-tv
```

## Available Commands

```bash
npm run android        # Run on phone/tablet
npm run android-tv     # Run on Android TV device
npm start             # Start Metro bundler
npm run lint          # Run ESLint
npm run test          # Run tests
```

## License

Apache License 2.0

---

**Version:** 1.0.0 | **Last Updated:** 2026-06-04
