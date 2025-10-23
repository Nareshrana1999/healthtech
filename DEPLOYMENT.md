# HealthTech Deployment Guide

## Prerequisites

Before deploying the HealthTech mobile application, ensure you have:

### Required Accounts
- **GitHub Account**: https://github.com
- **Expo Account**: https://expo.dev
- **Google Play Console**: https://play.google.com/console (for Android)
- **Apple Developer Account**: https://developer.apple.com (for iOS)

### Required Tools
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli`

## Setup Steps

### 1. Configure Expo Project

```powershell
# Login to Expo
eas login

# Initialize EAS
eas build:configure

# Update app.json with your project ID
# Get it from: https://expo.dev/accounts/[username]/projects/[project-name]/settings
```

### 2. Configure Environment Variables

Create `.env` file:
```env
EXPO_PUBLIC_API_URL=https://your-api-url.com
```

### 3. Configure GitHub Secrets

Go to: `https://github.com/Nareshrana1999/healthtech/settings/secrets/actions`

Add the following secrets:
- `EXPO_TOKEN`: Get from `expo whoami --json` or https://expo.dev/accounts/[username]/settings/access-tokens

### 4. Build Configuration

#### For Android

1. **Generate Upload Key**
   ```powershell
   keytool -genkeypair -v -storetype PKCS12 -keystore healthtech-upload-key.keystore -alias healthtech-key -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configure credentials**
   ```powershell
   eas credentials
   ```

3. **Update eas.json** (already configured)

#### For iOS

1. **Enroll in Apple Developer Program** ($99/year)

2. **Configure credentials**
   ```powershell
   eas credentials
   ```

3. **Set up provisioning profiles and certificates**

### 5. Test Build

```powershell
# Build for Android (development)
eas build --platform android --profile development

# Build for iOS (development) 
eas build --platform ios --profile development
```

## Deployment Workflows

### Method 1: Automated GitHub Release

1. **Commit and push code**
   ```powershell
   git add .
   git commit -m "Ready for release"
   git push origin main
   ```

2. **Create version tag**
   ```powershell
   git tag -a v1.0.0 -m "Release v1.0.0"
   git push origin v1.0.0
   ```

3. **GitHub Actions will automatically**:
   - Build Android APK
   - Build Android AAB
   - Build iOS IPA
   - Create GitHub Release
   - Upload build artifacts

4. **Download from GitHub Releases**:
   - Navigate to: https://github.com/Nareshrana1999/healthtech/releases
   - Download the latest release
   - APK: Direct install on Android
   - IPA: Requires TestFlight or enterprise distribution

### Method 2: Manual EAS Build

```powershell
# Build Android APK (for testing/sideloading)
eas build --platform android --profile production

# Build Android AAB (for Google Play)
eas build --platform android --profile production-aab

# Build iOS IPA
eas build --platform ios --profile production
```

Builds will be available at: https://expo.dev/accounts/[username]/projects/healthtech-app/builds

### Method 3: Local Build

**Android:**
```powershell
# Generate Android bundle
cd android
./gradlew bundleRelease

# Output: android/app/build/outputs/bundle/release/app-release.aab
```

**iOS (requires macOS):**
```bash
cd ios
pod install
xcodebuild -workspace HealthTechApp.xcworkspace -scheme HealthTechApp -configuration Release clean archive
```

## Store Submission

### Google Play Store

1. **Prepare Store Assets**
   - App icon (512x512)
   - Feature graphic (1024x500)
   - Screenshots (phone, tablet)
   - App description
   - Privacy policy URL

2. **Create App in Play Console**
   - Go to https://play.google.com/console
   - Create new app
   - Complete store listing

3. **Upload AAB**
   ```powershell
   # Using EAS
   eas submit --platform android --latest

   # Or manually upload in Play Console
   ```

4. **Complete Release**
   - Internal testing first
   - Then closed testing (beta)
   - Finally production release

### Apple App Store

1. **Prepare Store Assets**
   - App icon (1024x1024)
   - Screenshots for all device sizes
   - App preview video (optional)
   - App description
   - Privacy policy URL

2. **Create App in App Store Connect**
   - Go to https://appstoreconnect.apple.com
   - Create new app
   - Complete app information

3. **Upload IPA**
   ```powershell
   # Using EAS
   eas submit --platform ios --latest

   # Or use Xcode/Transporter
   ```

4. **Submit for Review**
   - Complete all required information
   - Answer review questions
   - Submit for review (typically 24-48 hours)

## Distribution via GitHub Releases

### For Android Users

1. **Enable Unknown Sources**
   - Settings → Security → Enable "Unknown Sources"

2. **Download APK**
   - Go to: https://github.com/Nareshrana1999/healthtech/releases
   - Download latest APK

3. **Install**
   - Open downloaded APK
   - Follow installation prompts

### For iOS Users

**Option A: TestFlight (Recommended)**
1. Build and upload IPA via EAS or Xcode
2. Share TestFlight link with users
3. Users download TestFlight app
4. Install via TestFlight

**Option B: Enterprise Distribution**
1. Requires Apple Enterprise Developer account ($299/year)
2. Create enterprise provisioning profile
3. Build with enterprise profile
4. Distribute IPA directly

**Option C: Ad Hoc Distribution**
1. Register device UDIDs (max 100 devices)
2. Create ad hoc provisioning profile
3. Build with ad hoc profile
4. Install via iTunes/Finder

## Continuous Deployment

### Automatic Releases

The project is configured for automatic releases:

1. **On Push to Main**: Development builds
2. **On Tag Creation**: Production builds + GitHub release

### Manual Trigger

You can manually trigger builds via GitHub Actions:
1. Go to: https://github.com/Nareshrana1999/healthtech/actions
2. Select "EAS Build and Release"
3. Click "Run workflow"
4. Choose platform and branch

## Monitoring & Updates

### Over-the-Air (OTA) Updates

For JavaScript-only changes:
```powershell
eas update --branch production --message "Bug fixes"
```

Users will receive updates automatically without reinstalling.

### Full App Updates

For native changes (dependencies, configs):
1. Increment version in app.json
2. Create new build
3. Submit to stores or create new GitHub release

## Troubleshooting

### Build Fails
- Check build logs in EAS dashboard
- Verify all credentials are configured
- Ensure dependencies are compatible

### Android Installation Issues
- Verify APK is signed correctly
- Check Android version compatibility
- Enable unknown sources

### iOS Installation Issues
- Verify device UDID is registered
- Check provisioning profile
- Ensure certificate is valid

## Security Checklist

Before production release:
- [ ] Remove all debug/console logs
- [ ] Update API base URL to production
- [ ] Enable code obfuscation
- [ ] Configure proper SSL pinning
- [ ] Update all API keys and secrets
- [ ] Enable crash reporting
- [ ] Set up analytics
- [ ] Configure proper error tracking
- [ ] Review all permissions
- [ ] Complete security audit

## Support

For deployment issues:
- **EAS Docs**: https://docs.expo.dev/build/introduction/
- **GitHub Actions Docs**: https://docs.github.com/en/actions
- **Play Console Help**: https://support.google.com/googleplay/android-developer
- **App Store Connect Help**: https://developer.apple.com/support/app-store-connect/

---

**Note**: Always test builds thoroughly before submitting to stores or creating public releases.
