# 🚀 Build & Release Instructions

## Quick Build Commands

### For GitHub Release Distribution

#### Method 1: Automatic Release (Recommended)

```powershell
# 1. Commit your changes
git add .
git commit -m "Ready for v1.0.0 release"

# 2. Create and push a version tag
git tag -a v1.0.0 -m "Version 1.0.0 - Initial Release"
git push origin v1.0.0

# 3. GitHub Actions will automatically:
#    - Build Android APK
#    - Build Android AAB  
#    - Build iOS IPA (if macOS runner configured)
#    - Create GitHub Release
#    - Upload all build artifacts

# 4. Download builds from:
#    https://github.com/Nareshrana1999/healthtech/releases
```

#### Method 2: Manual EAS Build

```powershell
# Install EAS CLI (one time)
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS (one time)
eas build:configure

# Build Android APK
eas build --platform android --profile production

# Build Android AAB (for Play Store)
eas build --platform android --profile production-aab

# Build iOS
eas build --platform ios --profile production

# After builds complete, manually create GitHub release:
gh release create v1.0.0 \
  --title "HealthTech v1.0.0" \
  --notes "Download APK (Android) or IPA (iOS) and install" \
  path/to/app-release.apk \
  path/to/app-release.aab \
  path/to/HealthTech.ipa
```

### For App Store Distribution

#### Google Play Store

```powershell
# 1. Build AAB
eas build --platform android --profile production-aab

# 2. Submit to Play Store
eas submit --platform android --latest

# Or manually upload to:
# https://play.google.com/console
```

#### Apple App Store

```powershell
# 1. Build IPA
eas build --platform ios --profile production

# 2. Submit to App Store
eas submit --platform ios --latest

# Or manually upload to:
# https://appstoreconnect.apple.com
```

## Installation for End Users

### Android Users

**From GitHub Release:**
1. Go to https://github.com/Nareshrana1999/healthtech/releases
2. Download the latest APK file
3. On your Android device:
   - Settings → Security → Enable "Unknown Sources"
   - Open the downloaded APK
   - Tap "Install"

**From Google Play Store:**
1. Search for "HealthTech" in Play Store
2. Tap "Install"

### iOS Users

**From TestFlight:**
1. Install TestFlight app from App Store
2. Open the TestFlight invitation link
3. Tap "Install"

**From App Store:**
1. Search for "HealthTech" in App Store
2. Tap "Get"

## Versioning Guide

Use semantic versioning: `vMAJOR.MINOR.PATCH`

```powershell
# Patch release (bug fixes)
git tag -a v1.0.1 -m "Bug fixes"

# Minor release (new features)
git tag -a v1.1.0 -m "New features"

# Major release (breaking changes)
git tag -a v2.0.0 -m "Major update"

# Push tag
git push origin v1.0.1
```

## Build Status

Check build status at:
- GitHub Actions: https://github.com/Nareshrana1999/healthtech/actions
- EAS Build: https://expo.dev/accounts/[username]/projects/healthtech-app/builds

## Troubleshooting

### Build Fails
- Check GitHub Actions logs
- Verify EAS credentials: `eas credentials`
- Check app.json configuration

### Can't Install APK
- Enable "Unknown Sources" in Android settings
- Check if APK is properly signed
- Verify Android version compatibility

### iOS Installation Issues
- Ensure device UDID is registered (for Ad Hoc)
- Check provisioning profile
- Verify certificate validity

## Need Help?

- Documentation: See README.md, DEPLOYMENT.md, QUICKSTART.md
- GitHub Issues: https://github.com/Nareshrana1999/healthtech/issues
- Expo Docs: https://docs.expo.dev
