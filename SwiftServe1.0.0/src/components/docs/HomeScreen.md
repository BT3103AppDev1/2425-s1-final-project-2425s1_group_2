# SwiftServe Home Screen Component Documentation

This component represents the main welcome screen for the SwiftServe application.

## Template Structure

- **Background Image** (`WelcomeBGImg`): Contain the full-screen background image.
- **Container** (`WelcomeContainer`): Centers content, logo, title, sign-up button, and guest access link.

## Script Logic

- Handles user navigation and anonymous sign-in.
- **LGSClick**: Redirects to `/signup` page with page reload.
- **signInAnonymously**: Signs in anonymously, sets displayName, and navigates to guest dashboard.

## Styling

- **Full-screen Background and Centered Layout**.
- **Responsive Button Styling**.
