# SignUpScreen Component

The `SignUpScreen` component allows users to sign up for an account in the SwiftServe app. It provides input fields for email, username, password, and password confirmation. It also includes terms of service acceptance, Google sign-up integration, and modals for displaying terms and notifications.

## Table of Contents

1. [Overview](#overview)
2. [Props](#props)
3. [Data Properties](#data-properties)
4. [Methods](#methods)

## Overview

This component is designed to handle user registration with features including:

- Email and password sign-up.
- Password visibility toggle.
- Terms of service modal.
- Google authentication.
- Custom notification modal for errors and success messages.

## Props

This component does not currently accept any props.

## Data Properties

- **email** (String): Stores the user's email address.
- **username** (String): Stores the username input by the user.
- **password** (String): Stores the user's password.
- **cPassword** (String): Stores the confirmation password.
- **showPassword** (Boolean): Toggles password visibility.
- **agreeToTerms** (Boolean): Tracks if the user has accepted the terms of service.
- **showTermsModal** (Boolean): Controls the visibility of the terms modal.
- **termsContent** (String): Contains the HTML content of the terms and conditions.
- **showCustomModal** (Boolean): Controls the visibility of the notification modal.
- **modalMessage** (String): Stores the message displayed in the notification modal.

## Methods

- **togglePassword**: Toggles the visibility of the password input fields.
- **openTermsModal**: Opens the terms of service modal.
- **closeTermsModal**: Closes the terms of service modal.
- **openModal(message)**: Opens the notification modal with a specific message.
- **closeModal**: Closes the notification modal.
- **loadTermsContent**: Loads terms and conditions content from a file (`termsandconditions.html`) for display in the modal.
- **signUpWithGoogle**: Handles user sign-up using Google authentication and saves user data to Firestore.
- **savetoFirestore**: Handles user registration with email and password, including validation and storing user data to Firestore.
- **resetForm**: Resets form fields after a successful sign-up.
- **savetoFirestoreGoogle**: Saves Google sign-up user data to Firestore and handles validation.
