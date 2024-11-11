# CustOrders Component

## Table of Contents

1. [Overview](#overview)
2. [Props](#props)
3. [Data Properties](#data-properties)
4. [Methods](#methods)

## Overview

The `CustOrders` component manages and display current and past orders for a customer. It includes features for order status updates, quick order option from past orders, and modals for notifications. The component retrieves orders from Firebase Firestore and allows navigation to specific order details and dining options.

## Props

This component does not accept any props.

## Data Properties

- **user** (String | Boolean): Stores the ID of the authenticated user or `false` if not authenticated.
- **currentOrders** (Array): Holds the list of current, uncollected orders.
- **past5Orders** (Array): Holds the last five collected orders for quick reordering.
- **showQuickOrderPopup** (Boolean): Controls visibility of the quick order popup.
- **selectedOrder** (Object | null): Stores the selected order for the quick order popup.
- **showCustomModal** (Boolean): Controls visibility of the custom modal.
- **modalMessage** (String): Message content for the custom modal.

## Methods

- **openModal(message)**: Opens a modal with a specified message to notify the user of certain events or errors.

- **closeModal**: Closes the modal and clears the message.

- **goToDiningOptions**: Redirects the user to the dining options page for placing new orders.

- **updateORC(order)**: Marks an order as collected by updating the `collected` status in Firestore. Refreshes the `currentOrders` and `past5Orders` data properties to reflect the update.

- **updateVON(order)**: Retrieves and displays the order number for a specified order by opening a modal with the order number.

- **getCurrentOrders(userId)**: Fetches the current, uncollected orders for the authenticated user from Firestore and populates the `currentOrders` array. Orders are processed and displayed as they are retrieved.

- **getPastOrders(userId)**: Retrieves the last five collected orders for the user from Firestore, ordered by the creation date, and stores them in the `past5Orders` array for quick reordering.

- **quickOrder(order)**: Opens the quick order popup for a selected past order, allowing the user to reorder with similar details.

- **closePopup**: Closes the quick order popup and clears the selected order.

- **continueOrder**: Redirects the user to a new order page pre-filled with details from the selected past order.

- **scrollLeft**: Scrolls the order display area to the left for easier navigation through current orders.

- **scrollRight**: Scrolls the order display area to the right, allowing users to view additional current orders.
