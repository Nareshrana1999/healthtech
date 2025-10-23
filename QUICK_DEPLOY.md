# Quick Deploy Steps - Start Here! 🚀

Follow these steps **in order** to deploy your HealthTech app to GitHub:

---

## ✅ Step 1: Login to Expo (REQUIRED NOW)

Open your PowerShell terminal and run:

```powershell
cd "c:\Users\Nares\OneDrive\Desktop\health tech\HealthTechApp"
eas login
```

**If you don't have an Expo account:**
1. Visit: https://expo.dev
2. Click "Sign Up"
3. Create account with email or GitHub
4. Come back and run `eas login`

**Then login with your credentials.**

---

## ✅ Step 2: Configure EAS Project

After logging in, run:

```powershell
eas build:configure
```

When prompted:
- "Would you like to create a project?" → **Yes**
- "Which platforms?" → **All** (iOS and Android)

This creates your Expo project and updates `app.json`.

---

## ✅ Step 3: Get EXPO_TOKEN for GitHub Actions

Generate an access token:

```powershell
eas login  # Make sure you're logged in
```

Then visit: https://expo.dev/accounts/[YOUR_USERNAME]/settings/access-tokens

1. Click **"Create Token"**
2. Name: `GitHub Actions`
3. Copy the token (you'll need it in Step 4)

---

## ✅ Step 4: Add Token to GitHub

1. Go to: https://github.com/Nareshrana1999/healthtech/settings/secrets/actions
2. Click **"New repository secret"**
3. Name: `EXPO_TOKEN`
4. Value: Paste your token from Step 3
5. Click **"Add secret"**

---

## ✅ Step 5: Commit & Push EAS Config

After `eas build:configure` updates your files:

```powershell
git add .
git commit -m "Configure EAS build for deployment"
git push
```

---

## ✅ Step 6: Create First Build Manually (Test)

Test the build process:

**For Android APK (recommended first):**
```powershell
eas build --platform android --profile preview
```

This will:
- Upload your project to Expo servers
- Build the APK (takes ~10-15 minutes)
- Give you a download link when done

**Wait for it to complete and download the APK to test!**

---

## ✅ Step 7: Create GitHub Release

Once the test build works, create a release:

```powershell
# Tag the release
git tag -a v1.0.0 -m "HealthTech v1.0.0 - First Release"
git push origin v1.0.0
```

This will:
- Trigger the GitHub Actions workflow
- Build Android APK, AAB, and iOS IPA automatically
- Create a GitHub Release with download links

Check progress: https://github.com/Nareshrana1999/healthtech/actions

---

## 🎉 Step 8: Download & Share

1. Go to: https://github.com/Nareshrana1999/healthtech/releases
2. Find your v1.0.0 release
3. Download the APK file
4. Install on Android devices for testing

---

## ⚡ Quick Commands Reference

```powershell
# Navigate to project
cd "c:\Users\Nares\OneDrive\Desktop\health tech\HealthTechApp"

# Check login status
eas whoami

# Start development server (test locally first)
npm start

# Build for Android
eas build --platform android --profile preview

# Build for iOS (requires Apple Developer account)
eas build --platform ios --profile production

# Check build status
eas build:list

# Create release tag
git tag -a v1.0.0 -m "Release message"
git push origin v1.0.0
```

---

## 🐛 Common Issues

**"Not logged in"**
→ Run `eas login` and enter your credentials

**"No Expo project found"**
→ Run `eas build:configure` to create project

**"Invalid credentials" in GitHub Actions**
→ Make sure EXPO_TOKEN is added to repository secrets

**Build fails**
→ Check: https://github.com/Nareshrana1999/healthtech/actions
→ View logs for detailed error messages

---

## 📱 Installation on Android Devices

1. Download the APK from GitHub Releases
2. On your Android device:
   - Go to Settings → Security
   - Enable "Install from Unknown Sources"
3. Open the downloaded APK file
4. Tap "Install"
5. Open the app and test!

---

## 🚀 What's Next?

1. **Test the APK** on real devices
2. **Implement remaining screens** (37 placeholders ready)
3. **Connect to backend API** (update .env file)
4. **Submit to Google Play Store** (use AAB file)
5. **Submit to iOS App Store** (requires Apple Developer account)

---

**Current Status**: Ready to login and deploy!

**Start with Step 1 above** → Run `eas login` in your terminal! 🎯
