# Merchant Orders Page Component

## Table of Contents

1. [Overview](#overview)
2. [Props](#props)
3. [Data Properties](#data-properties)
4. [Methods](#methods)

## Overview

The `MerchantOrdersPage` component provides a dashboard for merchants to manage incoming orders. It allows merchants to view orders, see detailed information about each order, and update the collection status of each order.

## Props

- **orderID**: String - The unique identifier for each order.
- **collectionState**: String - Current collection state of the order, such as "Waiting for Customer" or "Order Ready Collection".
- **orders**: Array - Contains details of each food item in an order.
- **dineOption**: String - Specifies whether the order is for dine-in or takeaway.
- **diningTime**: String - Indicates the preferred dining time for the order.
- **seats**: Array - Lists assigned seat numbers if applicable.
- **buttonDisabled**: Boolean - Controls the availability of the order collection button.
- **updateOrder**: Function - Function to update the order’s collection status.
- **clicked**: Boolean - Indicates if the collection button has been clicked.

## Data Properties

- **user**: Boolean - Tracks the authenticated user status.
- **merchantId**: String - Stores the merchant’s unique user ID.
- **orderData**: Array - List of all orders for the merchant, each containing order details.
- **orderNumMap**: Object - Maps order number to Firestore document IDs for efficient data updates.

## Methods

### setupOrderListener()

Sets up a Firestore listener to detect change in the `PlacedCustOrders` collection. If an order is modified, it updates the `orderData` to reflect the latest collection status, or removes it if the order is marked as collected.

### updateOrder(orderID, newState)

Updates the `collectionState` for a specific order.Calls `updateCollectable` to modify the order’s collection status in Firestore.

### updateCollectable(orderID)

Toggles the `orderStatus` field in Firestore for documents associated with the specified `orderID` in `orderNumMap`.

### handleClickedUpdate(orderID, newClickedState, newState)

Handles updates to the `clicked` state and `collectionState` of an order when the collection button is clicked. Updates Firestore with the new `orderStatus`.

### getOrderData()

Fetches all uncollected orders for the merchant from Firestore, organizing them into the `orderData` array. Each order contains information on items, dining option, time, and collection status. Also populates `orderNumMap` to map order IDs to Firestore document references.
