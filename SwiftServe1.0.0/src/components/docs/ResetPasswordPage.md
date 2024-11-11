# Reset Password Page Component

## Table of Contents

1. [Overview](#overview)
2. [Props](#props)
3. [Data Properties](#data-properties)
4. [Methods](#methods)

## Overview

The `ResetPassword` component allows users to request a password reset by entering their email address. Upon submitting, an email is sent with a password reset link. Success and error modals provide feedback to the user.

## Props

- No props are required for this component.

## Data Properties

- **email**: `String` - Holds the user’s email for password reset.
- **showSuccessModal**: `Boolean` - Controls visibility of the success modal after sending a reset email.
- **showErrorModal**: `Boolean` - Controls visibility of the error modal if the email fails to send.
- **errorMessage**: `String` - Stores any error message generated during the password reset process.

## Methods

### handleResetPassword()

Sends a password reset email to the email address entered by the user. If successful, it opens the success modal; otherwise, it displays an error modal with the specific error message.

### closeSuccessModal()

Closes the success modal.

### closeErrorModal()

Closes the error modal.

### redirectToLogin()

Redirects the user to the login page upon closing the success modal after a successful password reset request.
