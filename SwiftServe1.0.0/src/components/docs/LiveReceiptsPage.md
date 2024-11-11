# Live Receipts Component

## Table of Contents

1. [Overview](#overview)
2. [Props](#props)
3. [Data Properties](#data-properties)
4. [Methods](#methods)

## Overview

The `LiveReceipts` component retrieves and displays a user's recent orders (receipts) from the Firestore database. Each receipt includes the receipt ID, order detail, total cost, dining options, and seat information. The component allows users to view a scrollable list of past orders, with the most recent orders displayed at the top.

## Props

No props are required for this component.

## Data Properties

- **user**: The current authenticated user's UID.
- **receipts**: Array containing receipt data for the users past order, including order
  detail and dining information.

## Methods

### calculateTotal(orders)

Calculates the total price for a given receipt by summing up the `price` of each order in the `orders` array.

### async getAllOrders()

Fetches all orders associated with the authenticated user from Firestore, structures them by `receiptId`, and stores them in `receipts`. Each receipt includes the restaurant, items ordered, quantity, type, and individual item prices. The orders are displayed with the most recent receipt at the top.
