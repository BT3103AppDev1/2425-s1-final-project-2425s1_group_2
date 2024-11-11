# Merchant Toggle Availability Component

## Table of Contents

1. [Overview](#overview)
2. [Props](#props)
3. [Data Properties](#data-properties)
4. [Methods](#methods)

## Overview

The `MerchantToggleAvailability` component enable a merchant to manage the availability of their food items and stall. It includes a toggle switch to open or close the stall and displays a list of food items that can be individually enabled or disabled by clicking on them.

## Props

- **item**: Passed to `FoodItem` component for each food item, containing details like item name, availability, and image.

## Data Properties

- **isStallOpen**: Boolean to track if the stall is open or closed.
- **foodItems**: Array of food item objects with `id`, `foodItemName`, `available`, and `foodItemImage`.
- **merchant**: Object containing merchant details fetched from the database.
- **user**: Holds authenticated user data after login.

## Methods

### fetchMerchant(merchantId)

Fetches merchant information from the Firestore `UserProfile` collection using the `merchantId` and sets `isStallOpen` based on the retrieved status.

### fetchFoodItems(merchantId)

Fetches all food items related to the merchant from the `FoodItem` collection in Firestore and initializes the `foodItems` array with details of each item.

### toggleFoodItemAvailability(item)

Toggles the availability of a specific food item by updating the `available` status in Firestore. This change is also reflected locally to immediately update the UI.

### toggleStallAvailability(newValue)

Toggles the stall's availability by updating the `open` status in Firestore and sets `isStallOpen` based on the provided `newValue`.

### closeStall()

Sets `isStallOpen` to `false` immediately on the UI and then updates the stall's availability in Firestore to reflect the closed status.
