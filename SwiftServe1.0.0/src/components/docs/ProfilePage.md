# UpdateSettings Component

## Table of Contents

1. [Overview](#overview)
2. [Props](#props)
3. [Data Properties](#data-properties)
4. [Methods](#methods)

## Overview

The `UpdateSettings` component allows authenticated users to update their username and password within the SwiftServe application. It includes input fields for updating the username and password with a modal to display notifications. The component uses Firebase for re-authentication and profile updates and ensures that passwords are validated before any changes.

## Props

- **updateProfile**: Emitted when the profile is successfully updated, allowing parent components to react to changes in the user’s profile (e.g., username).

## Data Properties

- **user** (Object): Stores the currently authenticated user, populated on component mount using `onAuthStateChanged`.
- **showCustomModal** (Boolean): Controls the visibility of the notification modal.
- **modalMessage** (String): Stores the message displayed in the modal for user notifications.
- **nextStep** (Function | null): Stores a callback function to be executed after closing the modal, if needed.
- **showPasswords** (Boolean): Toggles password visibility for the current and new password fields.
- **currentPassword** (String): Stores the user’s current password for re-authentication purposes.
- **confirmPassword** (String): Stores the user’s new password for confirmation and updating.

## Methods

- **openModal(message, nextStep = null)**: Open the notification modal with specified message. Optionally accepts a callback function (`nextStep`) that is executed once the modal is closed.

- **closeModal**: Closes the modal and clears the message. If a `nextStep` function is provided, it runs after the modal closes.

- **savetoFirestore**: Updates the username if it has changed. After a successful update, it emits the `updateProfile` event to notify parent components and then validates passwords if provided.

- **validatePasswords**: Validates and updates the password. Function re-authenticates the user using their current password and updates the password if it passes validation. If the new password matches the old one or if re-authentication fails, it displays a relevant message in the modal.
