# LoginScreen Component

The `LoginScreen` component allows users to log into their SwiftServe account using their email and password or Google sign-in. It provides options to toggle password visibility, handle forgotten passwords, and displays notification modals for errors or guidance.

## Table of Contents

1. [Overview](#overview)
2. [Props](#props)
3. [Data Properties](#data-properties)
4. [Methods](#methods)

## Overview

This component is designed for user login with features including:

- Email and password login with Firebase authentication.
- Google sign-in option.
- Password visibility toggle.
- Modal notifications for errors and messages.

## Props

This component does not currently accept any props.

## Data Properties

- **email** (String): Stores the user's email address.
- **password** (String): Stores the user's password.
- **showPassword** (Boolean): Toggles password visibility in the input field.
- **showCustomModal** (Boolean): Controls the visibility of the notification modal.
- **modalMessage** (String): Holds the message text displayed in the modal.

## Methods

- **openModal(message)**: Opens the notification modal with a specific message.
- **closeModal**: Closes the notification modal.
- **handleLogin**: Attempts to log in the user using email and password. Redirects to the appropriate dashboard based on the user profile type (Customer or Merchant).
- **handleForgotPassword**: Redirects to the password reset page.
- **handleGoogleSignIn**: Allows login via Google and redirects to the correct dashboard. If the user does not have a profile, it prompts the user to sign up.
