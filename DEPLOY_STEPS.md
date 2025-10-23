# 🚀 Deploy to GitHub - Simple Steps

Follow these commands **exactly** in your PowerShell terminal:

---

## Step 1: Login to Expo

First, you need an Expo account. If you don't have one:
1. Visit: https://expo.dev
2. Click "Sign Up" 
3. Create account with email

Then login:

```powershell
cd "c:\Users\Nares\OneDrive\Desktop\health tech\HealthTechApp"
eas login
```

Enter your Expo email and password when prompted.

---

## Step 2: Configure EAS Project

```powershell
eas build:configure
```

When prompted:
- "Would you like to automatically create an EAS project?" → **Y** (Yes)
- "Which platforms?" → **All** (press Enter)

This creates your project on Expo servers.

---

## Step 3: Commit EAS Configuration

```powershell
git add .
git commit -m "Configure EAS project"
git push
```

---

## Step 4: Build Android APK (Test Build)

```powershell
eas build --platform android --profile preview
```

**What happens:**
- Your code is uploaded to Expo's build servers
- Takes ~10-15 minutes to build
- You'll get a download link when done
- Download the APK and test on Android device

**Wait for this to complete before proceeding!**

---

## Step 5: Get EXPO_TOKEN (For Automated Builds)

After your first manual build works, set up automated builds:

```powershell
# This opens your Expo settings in browser
Start-Process "https://expo.dev/settings/access-tokens"
```

On that page:
1. Click "Create Token"
2. Name: `GitHub Actions`
3. Copy the token (save it securely!)

Then add to GitHub:
1. Visit: https://github.com/Nareshrana1999/healthtech/settings/secrets/actions
2. Click "New repository secret"
3. Name: `EXPO_TOKEN`
4. Paste your token
5. Click "Add secret"

---

## Step 6: Create GitHub Release

Now trigger automated builds for all platforms:

```powershell
# Tag the release
git tag -a v1.0.0 -m "HealthTech v1.0.0 - First Release"

# Push the tag
git push origin v1.0.0
```

This will:
- Trigger GitHub Actions workflow
- Build Android APK, Android AAB, and iOS IPA
- Create a GitHub Release automatically
- Takes ~20-30 minutes for all platforms

---

## Step 7: Monitor Build Progress

Check build status:
- GitHub Actions: https://github.com/Nareshrana1999/healthtech/actions
- EAS Dashboard: https://expo.dev/accounts/[YOUR_USERNAME]/projects/healthtech-mobile-app/builds

---

## Step 8: Download & Test

When builds complete:

1. Go to: https://github.com/Nareshrana1999/healthtech/releases
2. Download the APK file
3. Install on your Android device:
   - Enable "Unknown Sources" in Settings
   - Open the APK file
   - Tap Install

---

## Quick Commands Summary

```powershell
# Navigate to project
cd "c:\Users\Nares\OneDrive\Desktop\health tech\HealthTechApp"

# Login to Expo
eas login

# Configure project
eas build:configure

# Commit changes
git add .
git commit -m "Configure EAS"
git push

# Build Android APK
eas build --platform android --profile preview

# Create release (after EXPO_TOKEN is added)
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# Check build status
eas build:list
```

---

## Troubleshooting

**"Invalid credentials" when logging in:**
- Make sure you're using the correct Expo account credentials
- Try resetting password at: https://expo.dev/forgot-password

**"No Expo project found":**
- Run: `eas build:configure`

**Build fails:**
- Check logs in: https://expo.dev
- Or GitHub Actions: https://github.com/Nareshrana1999/healthtech/actions

**Can't install APK on Android:**
- Go to Settings → Security
- Enable "Install from Unknown Sources" or "Allow from this source"

---

## What Files Will Be Generated?

After successful build:

1. **Android APK** (`healthtech-preview.apk`)
   - For direct installation on Android devices
   - Used for testing

2. **Android AAB** (`healthtech-production.aab`)
   - For Google Play Store submission
   - Smaller download size, optimized

3. **iOS IPA** (`healthtech-production.ipa`)
   - For App Store submission
   - Requires Apple Developer account ($99/year)

---

## Next Steps After First Build

1. ✅ Test APK on multiple Android devices
2. 📱 Get Apple Developer account for iOS
3. 🔐 Set up production backend API
4. 🎨 Create app screenshots for store listings
5. 📝 Write app description for stores
6. 🏪 Submit to Google Play Store (AAB file)
7. 🍎 Submit to Apple App Store (IPA file)

---

**Current Status**: Ready to deploy! Start with Step 1. 🎯
