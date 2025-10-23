# HealthTech Mobile Application

> Comprehensive Healthcare Management Mobile App with AI-Powered Triage, HIPAA Compliance, and Epic EHR Integration

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey.svg)

## 📱 Overview

HealthTech is a full-featured mobile healthcare management application built with React Native (Expo) that provides:

- **AI Voice Triage**: Real-time audio-based health assessment
- **Patient Management**: Comprehensive patient records and medical history
- **Provider Portal**: Healthcare provider tools and workflows
- **Appointment Scheduling**: Easy booking and calendar management
- **Reports & Documentation**: Digital signatures and secure sharing
- **Epic EHR Integration**: OAuth 2.0 integration with Epic systems
- **HIPAA Compliance**: Enterprise-grade security and encryption
- **Multi-Factor Authentication**: Biometric and PIN-based security

## 🏗️ Architecture

### Technology Stack

- **Framework**: React Native (Expo SDK 50+)
- **Language**: TypeScript
- **Navigation**: React Navigation 6.x
- **State Management**: Zustand
- **API Client**: Axios
- **Authentication**: JWT + OAuth 2.0
- **Security**: Expo Secure Store, Local Authentication
- **Notifications**: Expo Notifications
- **Audio**: Expo AV
- **UI Components**: React Native Paper, Custom Components

### Project Structure

```
HealthTechApp/
├── .github/
│   └── workflows/
│       ├── build.yml                 # CI/CD for building
│       └── eas-build.yml             # EAS Build workflow
├── src/
│   ├── navigation/
│   │   ├── index.tsx                 # Main navigation container
│   │   ├── AuthNavigator.tsx         # Authentication flow
│   │   ├── MainNavigator.tsx         # Main app navigation
│   │   ├── types.ts                  # Navigation types
│   │   └── stacks/                   # Individual stack navigators
│   ├── screens/
│   │   ├── auth/                     # Authentication screens
│   │   ├── home/                     # Dashboard and home screens
│   │   ├── patients/                 # Patient management
│   │   ├── appointments/             # Appointment scheduling
│   │   ├── reports/                  # Reports and documentation
│   │   └── more/                     # Settings and additional features
│   ├── services/
│   │   └── api.ts                    # API service layer
│   ├── store/
│   │   └── index.ts                  # Global state management
│   ├── theme/
│   │   └── index.ts                  # Theme configuration
│   └── types/
│       └── index.ts                  # TypeScript type definitions
├── assets/                           # Images, icons, fonts
├── scripts/
│   └── generateScreens.js            # Screen generation utility
├── app.json                          # Expo configuration
├── eas.json                          # EAS Build configuration
├── package.json                      # Dependencies
└── tsconfig.json                     # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli`
- iOS: Xcode 14+ (macOS only)
- Android: Android Studio with SDK 33+

### Installation

1. **Clone the repository**
   ```powershell
   git clone https://github.com/Nareshrana1999/healthtech.git
   cd healthtech/HealthTechApp
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Configure environment**
   Create `.env` file:
   ```
   EXPO_PUBLIC_API_URL=https://api.healthtech.example.com
   ```

4. **Start development server**
   ```powershell
   npm start
   ```

### Development

```powershell
# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Run on Web
npm run web

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

## 📦 Building for Production

### Using EAS Build (Recommended)

1. **Configure EAS**
   ```powershell
   eas login
   eas build:configure
   ```

2. **Build Android APK**
   ```powershell
   eas build --platform android --profile production
   ```

3. **Build Android AAB (for Play Store)**
   ```powershell
   eas build --platform android --profile production-aab
   ```

4. **Build iOS**
   ```powershell
   eas build --platform ios --profile production
   ```

### Local Builds

**Android:**
```powershell
cd android
./gradlew assembleRelease
# APK at: android/app/build/outputs/apk/release/
```

**iOS:**
```bash
cd ios
pod install
xcodebuild -workspace HealthTechApp.xcworkspace -scheme HealthTechApp -configuration Release archive
```

## 🔄 CI/CD & GitHub Releases

### Automated Builds

Builds are triggered automatically on:
- **Push to main**: Development builds
- **Tags (v*)**: Production builds with GitHub releases

### Creating a Release

1. **Tag a version**
   ```powershell
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

2. **GitHub Actions will**:
   - Build Android APK & AAB
   - Build iOS IPA
   - Create GitHub Release
   - Upload binaries as release assets

3. **Download from Releases**:
   - Go to: https://github.com/Nareshrana1999/healthtech/releases
   - Download APK (Android) or IPA (iOS)

### Manual GitHub Release

```powershell
# Build locally first
eas build --platform all --profile production

# Create release on GitHub
gh release create v1.0.0 \
  --title "HealthTech v1.0.0" \
  --notes "Initial release" \
  path/to/app-release.apk \
  path/to/app-release.aab \
  path/to/HealthTech.ipa
```

## 🏪 Store Deployment

### Google Play Store

1. **Build AAB**
   ```powershell
   eas build --platform android --profile production-aab
   ```

2. **Submit**
   ```powershell
   eas submit --platform android --latest
   ```

3. **Configure Play Console**:
   - Upload AAB
   - Complete store listing
   - Set up app signing
   - Submit for review

### Apple App Store

1. **Build IPA**
   ```powershell
   eas build --platform ios --profile production
   ```

2. **Submit**
   ```powershell
   eas submit --platform ios --latest
   ```

3. **Configure App Store Connect**:
   - Upload IPA
   - Complete app information
   - Submit for review

## 🔐 Security & Compliance

### HIPAA Compliance

- **Encryption at Rest**: AES-256 via Expo Secure Store
- **Encryption in Transit**: TLS 1.2+ enforced
- **Authentication**: JWT + MFA + Biometric
- **Audit Logging**: All data access tracked
- **Session Management**: Automatic timeout
- **Data Privacy**: Role-based access control

### Security Features

- Multi-factor authentication (MFA)
- Biometric authentication (Face ID/Touch ID/Fingerprint)
- PIN-based device lock
- Automatic session timeout
- Encrypted local storage
- Secure API communication

## 🔗 Integrations

### Epic EHR Integration

- OAuth 2.0 authentication
- FHIR API integration
- Patient data synchronization
- Appointment syncing

### Notification Services

- Push notifications (FCM/APNs)
- In-app notifications
- Deep linking support

## 📱 Features Breakdown

### 1. Authentication & Onboarding
- Welcome screen
- Login with email/password
- Sign up with role selection
- Password reset
- Multi-factor authentication
- Guided onboarding tour

### 2. Dashboard
- Role-based views (Patient/Provider/Admin)
- Quick actions
- Recent activity
- Upcoming appointments
- Notifications badge

### 3. Patient Management
- Patient directory with search/filter
- Detailed patient profiles
- Medical timeline
- Demographics and insurance
- Emergency contacts

### 4. Provider Management
- Provider directory
- Specialty filtering
- Provider profiles
- Availability tracking

### 5. Encounter Management
- Create and manage encounters
- Multiple encounter types (triage, in-person, virtual)
- Link to reports
- Status tracking
- Privacy controls

### 6. Reports & Documentation
- Report creation and editing
- Rich text editor
- Digital signatures
- PDF export
- Secure sharing

### 7. AI Voice Triage
- Real-time audio recording
- AI-powered analysis
- Urgency level assessment
- Symptom extraction
- Session history

### 8. Appointments
- Calendar view (month/week/day)
- Book appointments
- Provider availability
- Video call integration
- Appointment reminders

### 9. Settings & Preferences
- Profile management
- Theme selection (light/dark/auto)
- Notification preferences
- Privacy settings
- Security settings
- Language selection

### 10. Integrations
- Epic EHR connection
- API monitoring
- Sync status

## 🧪 Testing

```powershell
# Run tests
npm test

# Coverage report
npm run test:coverage

# E2E tests
npm run test:e2e
```

## 📄 API Documentation

Base URL: `https://api.healthtech.example.com`

### Authentication
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `POST /auth/logout` - User logout
- `POST /auth/reset-password` - Password reset
- `POST /auth/verify-mfa` - MFA verification

### Patients
- `GET /patients` - List patients
- `GET /patients/:id` - Get patient details
- `PUT /patients/:id` - Update patient
- `GET /patients/:id/timeline` - Get medical timeline

### Encounters
- `GET /encounters` - List encounters
- `POST /encounters` - Create encounter
- `GET /encounters/:id` - Get encounter details
- `PUT /encounters/:id` - Update encounter

### Reports
- `GET /reports` - List reports
- `POST /reports` - Create report
- `PUT /reports/:id` - Update report
- `POST /reports/:id/sign` - Sign report

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

- **Email**: support@healthtech.app
- **Documentation**: https://docs.healthtech.app
- **Issues**: https://github.com/Nareshrana1999/healthtech/issues

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React Native community
- Expo team
- Healthcare standards organizations (HL7, FHIR)

---

**Built with ❤️ for better healthcare**
