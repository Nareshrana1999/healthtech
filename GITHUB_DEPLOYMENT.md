# GitHub Deployment Guide

This guide will help you deploy your HealthTech app to GitHub Releases for both Android and iOS.

## Prerequisites

✅ **Completed:**
- [x] EAS CLI installed globally
- [x] Project pushed to GitHub: https://github.com/Nareshrana1999/healthtech
- [x] GitHub Actions workflows configured
- [x] All TypeScript errors fixed

⏳ **Required:**
- [ ] Expo account (create at https://expo.dev)
- [ ] EXPO_TOKEN added to GitHub Secrets

---

## Step 1: Create Expo Account & Get Token

### 1.1 Create Expo Account
1. Visit https://expo.dev
2. Sign up with email or GitHub
3. Verify your email

### 1.2 Get EXPO_TOKEN
Run this command and login when prompted:
```bash
eas login
```

After login, generate a token:
```bash
eas whoami
```

Then create an access token:
1. Visit: https://expo.dev/accounts/[your-username]/settings/access-tokens
2. Click "Create Token"
3. Name it: "GitHub Actions"
4. Copy the token (save it securely!)

---

## Step 2: Add EXPO_TOKEN to GitHub

1. Go to your repository: https://github.com/Nareshrana1999/healthtech
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `EXPO_TOKEN`
5. Value: Paste your token from Step 1.2
6. Click **Add secret**

---

## Step 3: Configure EAS Project

Run in your project directory:

```bash
cd "c:\Users\Nares\OneDrive\Desktop\health tech\HealthTechApp"

# Login to Expo (if not already)
eas login

# Configure the project
eas build:configure
```

When prompted:
- Select: **Yes** to create a new project
- Select platform: **All** (iOS and Android)

This will update your `app.json` with the project ID.

---

## Step 4: Manual Test Build (Optional but Recommended)

Before triggering automated builds, test manually:

### Android APK (for testing):
```bash
eas build --platform android --profile preview
```

### Android AAB (for Play Store):
```bash
eas build --platform android --profile production-aab
```

### iOS (requires Apple Developer Account):
```bash
eas build --platform ios --profile production
```

**Note:** The build will run on Expo's servers. You'll get a download link when complete.

---

## Step 5: Deploy via GitHub Release

### Option A: Manual GitHub Release (Recommended First Time)

1. **Create a Git tag:**
```bash
git tag -a v1.0.0 -m "First release - HealthTech Mobile App"
git push origin v1.0.0
```

2. **Wait for GitHub Actions:**
   - Go to: https://github.com/Nareshrana1999/healthtech/actions
   - The `EAS Build` workflow will start automatically
   - Monitor the build progress

3. **Download artifacts:**
   - Once complete, go to **Releases**
   - Download the APK/AAB/IPA files

### Option B: Manual Workflow Trigger

1. Go to: https://github.com/Nareshrana1999/healthtech/actions
2. Select **EAS Build** workflow
3. Click **Run workflow**
4. Choose:
   - Branch: `master`
   - Platform: `all` (or `android`/`ios`)
5. Click **Run workflow**

---

## Step 6: Create GitHub Release

After builds complete:

1. Go to: https://github.com/Nareshrana1999/healthtech/releases
2. Click **Draft a new release**
3. Tag: `v1.0.0` (or your version)
4. Title: `HealthTech v1.0.0 - Initial Release`
5. Description:
```markdown
## HealthTech Mobile App - v1.0.0

### Features
- ✅ AI-Powered Patient Triage
- ✅ Secure Patient Management
- ✅ Appointment Scheduling
- ✅ Medical Reports & Documentation
- ✅ Epic EHR Integration
- ✅ HIPAA Compliant Security
- ✅ Biometric Authentication

### Downloads
- **Android APK**: For direct installation on Android devices
- **Android AAB**: For Google Play Store submission
- **iOS IPA**: For TestFlight/App Store submission

### Installation
**Android:**
1. Download the APK file
2. Enable "Install from Unknown Sources" in Settings
3. Open the APK and install

**iOS:**
Requires TestFlight or enterprise distribution
```

6. Upload the build files (APK/AAB/IPA)
7. Click **Publish release**

---

## Step 7: Distribute to Users

### For Testing (Android):
1. Share the GitHub Release link with testers
2. They download the APK
3. Install and test

### For Production:

**Android (Google Play Store):**
1. Go to https://play.google.com/console
2. Create app listing
3. Upload the AAB file from GitHub Release
4. Fill in store listing details
5. Submit for review

**iOS (App Store):**
1. Go to https://appstoreconnect.apple.com
2. Create app listing
3. Upload IPA via Transporter or Xcode
4. Fill in store listing details
5. Submit for review

---

## Troubleshooting

### Build fails with "Invalid credentials"
- Ensure EXPO_TOKEN is correctly added to GitHub Secrets
- Re-generate the token if expired

### Build fails with "No Expo project found"
- Run `eas build:configure` locally first
- Commit and push the updated `app.json`

### iOS build requires provisioning profile
- You need an Apple Developer account ($99/year)
- Run `eas build --platform ios` locally to set up credentials

### App crashes on startup
- Check that all dependencies are installed
- Verify API endpoints are configured
- Check device logs: `adb logcat` (Android) or Xcode Console (iOS)

---

## Next Steps

1. ✅ Test the APK on physical Android devices
2. 📱 Set up TestFlight for iOS beta testing
3. 🔐 Configure production API endpoints
4. 📊 Set up analytics (Firebase, Sentry)
5. 🏪 Prepare store listings (screenshots, descriptions)
6. 📋 Complete HIPAA compliance documentation
7. 🚀 Submit to app stores

---

## Useful Commands

```bash
# Check EAS build status
eas build:list

# View build details
eas build:view [build-id]

# Download build artifact
eas build:download --id [build-id]

# Submit to stores
eas submit --platform android
eas submit --platform ios

# Update app OTA (for non-native changes)
eas update

# View project info
eas project:info
```

---

## Support

- **Expo Documentation**: https://docs.expo.dev
- **EAS Build**: https://docs.expo.dev/build/introduction/
- **GitHub Actions**: https://docs.github.com/actions
- **Your Repository**: https://github.com/Nareshrana1999/healthtech

---

**Status**: Ready for deployment! 🚀
