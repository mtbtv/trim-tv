# Trim TV - Build & Development Guide

## Prerequisites

### System Requirements
- **OS:** Windows, macOS, or Linux
- **Node.js:** v18 or higher
- **RAM:** 8GB minimum (16GB recommended)
- **Storage:** 20GB free space

### Software Requirements

1. **Node.js and npm**
   ```bash
   node --version  # v18.0.0 or higher
   npm --version   # 8.0.0 or higher
   ```

2. **Android SDK and Android Studio**
   - Download: https://developer.android.com/studio
   - Install Android SDK (API 34 recommended)
   - Accept licenses: `sdkmanager --licenses`

3. **Java Development Kit (JDK)**
   - JDK 17 or higher required
   - Download: https://www.oracle.com/java/technologies/downloads/

4. **Git**
   - Download: https://git-scm.com/

## Environment Setup

### Windows

1. **Set Environment Variables:**
   ```powershell
   # Run as Administrator
   $env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
   $env:ANDROID_HOME = "$env:APPDATA\Local\Android\Sdk"
   $env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
   $env:PATH += ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\tools"
   ```

2. **Verify Installation:**
   ```powershell
   java -version
   adb version
   ```

### macOS

1. **Install using Homebrew (optional):**
   ```bash
   brew install openjdk@17
   ```

2. **Set Environment Variables:**
   ```bash
   # Add to ~/.zshrc or ~/.bash_profile
   export JAVA_HOME=$(/usr/libexec/java_home -v 17)
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export ANDROID_SDK_ROOT=$ANDROID_HOME
   export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools
   ```

3. **Apply Changes:**
   ```bash
   source ~/.zshrc
   ```

### Linux

1. **Install Java:**
   ```bash
   sudo apt-get install openjdk-17-jdk
   ```

2. **Set Environment Variables:**
   ```bash
   # Add to ~/.bashrc or ~/.profile
   export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
   export ANDROID_HOME=$HOME/Android/Sdk
   export ANDROID_SDK_ROOT=$ANDROID_HOME
   export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools
   ```

3. **Apply Changes:**
   ```bash
   source ~/.bashrc
   ```

## Installation Steps

### Step 1: Clone Repository

```bash
git clone https://github.com/mtbtv/trim-tv.git
cd trim-tv
```

### Step 2: Install Dependencies

```bash
npm install
```

If you encounter issues:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Step 3: Prebuild for Android TV

```bash
npx expo prebuild -p android --clean
```

Accept prompts for package name and app name.

### Step 4: Run Development Build

#### Via Physical Android TV Device

1. Enable USB Debugging on your TV
2. Connect via USB
3. Run:
   ```bash
   adb devices  # Verify connection
   npm run android-tv
   ```

#### Via Android TV Emulator

1. Open Android Studio
2. AVD Manager → Create Virtual Device
3. Select "TV" profile
4. Launch emulator
5. Run:
   ```bash
   npm run android-tv
   ```

#### Via Metro Bundler

```bash
# Terminal 1
npm start

# Terminal 2
npm run android-tv
```

## Available Commands

```bash
npm run android        # Run on phone/tablet
npm run android-tv     # Run on Android TV device
npm run ios           # Run on iOS (macOS only)
npm start             # Start Metro bundler
npm run lint          # Run ESLint
npm run test          # Run tests
npm run prebuild      # Prebuild without clean
npm run prebuild:clean # Prebuild with clean
```

## Building Production APK/AAB

### Generate Keystore (First Time Only)

```bash
cd android/app

# Windows
keytool -genkey -v -keystore trim-tv.keystore -alias trim-tv-key -keyalg RSA -keysize 2048 -validity 10000

# macOS/Linux
keytool -genkey -v -keystore trim-tv.keystore -alias trim-tv-key -keyalg RSA -keysize 2048 -validity 10000
```

Prompts:
- Password: (create strong password)
- First and last name: Your Name
- Organization: Your Organization
- City/locality: Your City
- State/province: Your State
- Country code: Your Country Code
- Confirm: yes

### Build Release APK

```bash
cd android
./gradlew assembleRelease
# Output: app/build/outputs/apk/release/app-release.apk
```

### Build Release AAB (for Google Play)

```bash
cd android
./gradlew bundleRelease
# Output: app/build/outputs/bundle/release/app-release.aab
```

## Project Structure

```
trim-tv/
├── app/
│   ├── screens/                  # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── DetailsScreen.tsx
│   │   ├── PlayerScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── ProvidersScreen.tsx
│   ├── navigation/               # Navigation setup
│   │   └── RootNavigator.tsx
│   ├── components/               # Reusable components
│   ├── hooks/                    # Custom React hooks
│   ├── store/                    # Zustand store
│   │   └── useStore.ts
│   ├── providers/                # Provider system
│   │   ├── manager.ts
│   │   ├── scraper.ts
│   │   └── types.ts
│   ├── utils/                    # Utility functions
│   │   └── storage.ts
│   ├── types/                    # TypeScript types
│   │   └── index.ts
│   └── index.tsx                 # Main app component
├── assets/                       # Images, fonts, icons
├── app.json                      # Expo configuration
├── tsconfig.json                 # TypeScript config
├── tailwind.config.js            # Tailwind CSS config
├── babel.config.js               # Babel config
├── .eslintrc.js                  # ESLint config
├── .prettierrc.json              # Prettier config
├── package.json                  # Dependencies
├── index.ts                      # Entry point
├── README.md                     # Main documentation
├── PROVIDER_GUIDE.md             # Provider documentation
└── BUILD_GUIDE.md                # This file
```

## Troubleshooting

### Build Fails with Gradle Error

```bash
cd android
./gradlew clean
./gradlew assembleRelease
```

### Java Version Issues

```bash
java -version

# Set correct JAVA_HOME
export JAVA_HOME=/path/to/java17
```

### Android SDK Issues

```bash
# Update SDK
sdkmanager "platform-tools"
sdkmanager "platforms;android-34"
sdkmanager "build-tools;34.0.0"

# Accept licenses
sdkmanager --licenses
```

### Metro Bundler Issues

```bash
# Clear cache
npm start -- --reset-cache

# Or
rm -rf node_modules/.cache
npm start
```

### Device Not Detected

```bash
# Restart ADB
adb kill-server
adb start-server

# Check connection
adb devices

# For physical device:
# - Check USB cable
# - Enable USB debugging
# - Revoke USB authorizations if needed
```

## Performance Optimization

### Development
- Use Hermes engine for faster startup
- Enable ProGuard for faster builds

### TV Optimization
- Test on actual TV device
- Verify D-Pad navigation
- Check remote button mappings
- Optimize for 4K if supported

### Bundle Size
- Disable unnecessary modules
- Use ProGuard/R8 optimization

## Testing on Device

```bash
# View logs
adb logcat | grep trim-tv

# Clear app data
adb shell pm clear com.trimtv.app

# Install APK directly
adb install app-release.apk

# Uninstall app
adb uninstall com.trimtv.app
```

## Publishing to Google Play

1. Create Google Play Developer account
2. Create new app in Play Console
3. Complete app information
4. Upload AAB (app-release.aab)
5. Configure pricing and distribution
6. Set up TV compatibility
7. Submit for review

## Additional Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [Android TV Developer Guide](https://developer.android.com/training/tv)
- [Android Studio Guide](https://developer.android.com/studio/intro)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Support

- GitHub Issues: Report bugs or request features
- Documentation: Check README.md and PROVIDER_GUIDE.md
- Logs: Check `adb logcat` for debugging

---

**Version:** 1.0.0 | **Last Updated:** 2026-06-04
