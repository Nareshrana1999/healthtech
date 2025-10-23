# HealthTech Deployment Script
# This script automates the deployment process

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  HealthTech App Deployment Script  " -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if in correct directory
$currentPath = Get-Location
if (-not (Test-Path "app.json")) {
    Write-Host "ERROR: Please run this script from the HealthTechApp directory" -ForegroundColor Red
    Write-Host "Current path: $currentPath" -ForegroundColor Yellow
    exit 1
}

Write-Host "[1/6] Checking EAS CLI installation..." -ForegroundColor Yellow
$easInstalled = Get-Command eas -ErrorAction SilentlyContinue
if (-not $easInstalled) {
    Write-Host "Installing EAS CLI..." -ForegroundColor Green
    npm install -g eas-cli
}
Write-Host "✓ EAS CLI is installed" -ForegroundColor Green
Write-Host ""

Write-Host "[2/6] Checking Expo login status..." -ForegroundColor Yellow
$loginStatus = eas whoami 2>&1
if ($loginStatus -match "Not logged in") {
    Write-Host "You need to login to Expo first." -ForegroundColor Red
    Write-Host ""
    Write-Host "Please run: eas login" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "If you don't have an account:" -ForegroundColor Yellow
    Write-Host "1. Visit: https://expo.dev" -ForegroundColor White
    Write-Host "2. Click 'Sign Up'" -ForegroundColor White
    Write-Host "3. Create your account" -ForegroundColor White
    Write-Host "4. Come back and run: eas login" -ForegroundColor White
    Write-Host ""
    exit 1
}
Write-Host "✓ Logged in as: $loginStatus" -ForegroundColor Green
Write-Host ""

Write-Host "[3/6] Checking EAS project configuration..." -ForegroundColor Yellow
$appJson = Get-Content "app.json" -Raw | ConvertFrom-Json
if (-not $appJson.extra.eas.projectId) {
    Write-Host "Configuring EAS project..." -ForegroundColor Green
    eas build:configure
    Write-Host "✓ EAS project configured" -ForegroundColor Green
} else {
    Write-Host "✓ EAS project already configured: $($appJson.extra.eas.projectId)" -ForegroundColor Green
}
Write-Host ""

Write-Host "[4/6] Checking for pending changes..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "Committing EAS configuration changes..." -ForegroundColor Green
    git add .
    git commit -m "Configure EAS project for deployment"
    git push
    Write-Host "✓ Changes committed and pushed" -ForegroundColor Green
} else {
    Write-Host "✓ No pending changes" -ForegroundColor Green
}
Write-Host ""

Write-Host "[5/6] EXPO_TOKEN Setup Required" -ForegroundColor Yellow
Write-Host "For automated GitHub builds, you need to add EXPO_TOKEN to GitHub Secrets:" -ForegroundColor White
Write-Host ""
Write-Host "1. Get your token:" -ForegroundColor Cyan
Write-Host "   Visit: https://expo.dev/accounts/[YOUR_USERNAME]/settings/access-tokens" -ForegroundColor White
Write-Host "   Click 'Create Token' → Name: 'GitHub Actions' → Copy token" -ForegroundColor White
Write-Host ""
Write-Host "2. Add to GitHub:" -ForegroundColor Cyan
Write-Host "   Visit: https://github.com/Nareshrana1999/healthtech/settings/secrets/actions" -ForegroundColor White
Write-Host "   Click 'New repository secret' → Name: EXPO_TOKEN → Paste token → Add secret" -ForegroundColor White
Write-Host ""
$response = Read-Host "Have you added EXPO_TOKEN to GitHub Secrets? Type 'yes' to continue or 'no' to skip"
if ($response -ne "yes") {
    Write-Host ""
    Write-Host "Skipping EXPO_TOKEN check. You can add it later for automated builds." -ForegroundColor Yellow
    Write-Host ""
}
Write-Host "✓ EXPO_TOKEN configured" -ForegroundColor Green
Write-Host ""

Write-Host "[6/6] Ready to Deploy!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Choose deployment method:" -ForegroundColor Cyan
Write-Host "1. Manual build (build now on Expo servers)" -ForegroundColor White
Write-Host "2. GitHub Actions (create tag to trigger automated build)" -ForegroundColor White
Write-Host "3. Exit" -ForegroundColor White
Write-Host ""
$choice = Read-Host "Enter choice (1-3)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "Building Android APK..." -ForegroundColor Green
        Write-Host "This will take 10-15 minutes. You'll get a download link when done." -ForegroundColor Yellow
        Write-Host ""
        eas build --platform android --profile preview
        Write-Host ""
        Write-Host "✓ Build complete! Download from the link above." -ForegroundColor Green
        Write-Host "Install the APK on your Android device to test." -ForegroundColor Cyan
    }
    "2" {
        Write-Host ""
        $version = Read-Host "Enter version number like 1.0.0"
        if (-not $version) {
            $version = "1.0.0"
        }
        
        Write-Host ""
        Write-Host "Creating release tag: v$version" -ForegroundColor Green
        git tag -a "v$version" -m "HealthTech v$version - Release"
        git push origin "v$version"
        
        Write-Host ""
        Write-Host "✓ Release tag pushed to GitHub!" -ForegroundColor Green
        Write-Host ""
        Write-Host "GitHub Actions is now building your app..." -ForegroundColor Yellow
        Write-Host "Monitor progress: https://github.com/Nareshrana1999/healthtech/actions" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "When complete, download from: https://github.com/Nareshrana1999/healthtech/releases" -ForegroundColor Cyan
    }
    "3" {
        Write-Host "Exiting..." -ForegroundColor Yellow
        exit 0
    }
    default {
        Write-Host "Invalid choice. Exiting..." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "     Deployment Process Complete!    " -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Download and test the APK on Android devices" -ForegroundColor White
Write-Host "2. Implement remaining placeholder screens" -ForegroundColor White
Write-Host "3. Connect to your backend API" -ForegroundColor White
Write-Host "4. Submit to Google Play Store (use AAB build)" -ForegroundColor White
Write-Host "5. Submit to iOS App Store (requires Apple Developer account)" -ForegroundColor White
Write-Host ""
