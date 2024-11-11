# HawkerCentrePage Component

## Table of Contents

1. [Overview](#overview)
2. [Props](#props)
3. [Data Properties](#data-properties)
4. [Methods](#methods)

## Overview

The `HawkerCentrePage` component allow users to browse and select food items from various stalls at a hawker center. It supports filtering by category, selecting individual stalls, and managing a cart of selected items with checkout process. The component includes listeners for updates to stalls, food items, and cart content in Firebase, and provides modals for user notifications.

## Props

No props are required by this component.

## Data Properties

- **activeCategory** (String): Stores the selected food category (e.g., "All", "Chinese", "Vegetarian").
- **activeStall** (Object | null): Stores the selected stall object for filtering items by stall.
- **stalls** (Array): Holds a list of available stalls retrieved from Firebase.
- **items** (Array): Stores list of food items from stalls for browsing.
- **availableFilters** (Array): Predefined filters (e.g., "Halal", "Vegetarian") that users can apply.
- **cartItems** (Array): Tracks items added to the cart by the user.
- **categories** (Array): A list of food categories for filtering, such as "All", "Chinese", "Western".
- **user** (Object | null): The authenticated user object from Firebase.
- **HCName** (String | Boolean): Name of the hawker center, passed as a query parameter.
- **showCartModal** (Boolean): Controls visibility of the modal shown when the cart is empty.

## Methods

- **closeCartModal**: Closes the empty cart modal.

- **setupStallListener**: Sets up a real-time listener on the stalls collection in Firebase, filtering for open stalls. Updates the `stalls` list as stalls change and checks for any items in the cart from closed stalls, removing them if necessary.

- **setupFoodItemsListener**: Sets up a real-time listener on the food items collection in Firebase, updating the `items` list with each item’s availability and merchant association. If an item in the cart becomes unavailable, it is removed.

- **setupCartListener**: Listens to the current user's cart in Firebase and updates `cartItems`. Ensures each cart item is available and belongs to an open stall; otherwise, the item is removed.

- **checkAndRemoveItem(cartItem)**: Checks the availability of a specified cart item and removes it if it is unavailable or if the associated stall is closed.

- **removeItemFromCart(itemId)**: Removes an item from the cart both locally and in Firebase, based on the item’s ID.

- **updateActiveCategory(category)**: Updates the currently active category filter and clears the selected stall to display items for the selected category.

- **updateActiveStall(stall)**: Sets the specified stall as the active stall for filtering items.

- **addToCart(item)**: Adds a selected food item to the cart array for checkout.

- **checkout**: Navigates to the checkout page with the hawker center name in the query. If the cart is empty, it displays a modal asking the user to add items before proceeding.

- **cancelOrder**: Clears all items in the cart by removing each one from Firebase and resetting the cart array.

- **findStall(merchantId)**: Returns the stall object associated with the specified merchant ID from the stalls list.

- **viewFoodItem(item)**: Navigates to the food item’s detailed view if the item is available, with the hawker center name passed as a query parameter.

- **editCartItem(item)**: Opens the editing view for a specific cart item, allowing the user to modify details such as quantity or add-ons before checkout.
