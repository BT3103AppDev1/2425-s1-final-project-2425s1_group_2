# CheckoutComponent

## Table of Contents

1. [Overview](#overview)
2. [Props](#props)
3. [Data Properties](#data-properties)
4. [Methods](#methods)

## Overview

The `CheckoutComponent` component displays a summary of orders, the total price, options for dining or takeaway, a selection of payment methods, and an action to confirm and pay. It provides a UI for reviewing, editing, and confirming an order.

## Props

No props are needed for component

## Data Properties

- **selectedMethod** (String | null): Currently selected payment method.
- **paymentMethods** (Array): List of available payment methods, each containing an image source and an alt text for identification.
- **showDeleteModal** (Boolean): Controls visibility of the modal for cases where no payment method is selected.
- **orders** (Array): List of order items fetched from the user's cart.
- **dineOption** (String): Selected option for dine-in or takeaway.
- **diningTime** (String): Selected time slot for dining.
- **user** (Object | Boolean): The authenticated user object, or `false` if not authenticated.
- **HCName** (String | Boolean): Name of the hawker centre associated with the order, retrieved from the query parameter.

## Methods

### goPaymentSuccess

Handles order confirmation and payment. If no payment method is selected, it shows a modal; otherwise, it updates each order with additional information (e.g., receipt ID, order number, dining details, and payment mode). If the user selected "Dine in," it redirects to the payment success page; otherwise, it moves the order to the takeaway success page.

### closeDeleteModal

Closes the modal for confirming payment method selection.

### goHawkerCentre

Navigates back to the hawker center page, passing the hawker center name as a query parameter.

### goOrdersPage

Redirects the user to the food item page, enabling editing of the selected order item.

### selectMethod

Sets the selected payment method for the order based on user selection.

### setupCartListener

Sets up a listener to track changes in the user's cart. Updates the `orders` data property with items in the cart, checking for item availability and removing unavailable items.

### checkAndRemoveItem

Checks if an item in the cart is still available (both the item and its stall). If unavailable, the item is removed from the cart.

### removeItemFromCart

Removes a specified item from the cart by ID, updates the `orders` array, and logs any errors if encountered.
