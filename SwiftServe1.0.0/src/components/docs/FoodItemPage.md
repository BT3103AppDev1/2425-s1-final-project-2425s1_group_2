# FoodItemPage Component

## Table of Contents

1. [Overview](#overview)
2. [Props](#props)
3. [Data Properties](#data-properties)
4. [Methods](#methods)

## Overview

The `FoodItemPage` component allows users to view a specific food item, customize it with add-ons, specify special instructions, and add it to their cart. It provides an interface for quantity adjustments and displays the updated total price based on quantity and selected add-ons.

## Props

This component relies on several internal components (`AddOn`, `SpecialInstructions`, `LeftColumn`) and does not require external props.

## Data Properties

- **foodItem** (Object): Stores details of the selected food item from the menu.
- **merchant** (Object): Contains information about the food stall/merchant offering the item.
- **quantity** (Number): Tracks the quantity of the food item the user wishes to order.
- **addOns** (Array): List of add-ons available for the food item, including name, price, and selected quantity.
- **specialInstructions** (String): Holds any special instructions added by the user.
- **user** (Object | null): The authenticated user object.
- **cartItemId** (String | null): Cart item ID if editing an existing cart item.
- **cartItem** (Object | null): Stores cart item details if editing a saved cart item.
- **totalPrice** (Number): Holds the calculated total price, including quantity and add-ons.
- **hawkerCentre** (String | null): Hawker center name associated with the food item.
- **showAddToCartModal** (Boolean): Controls visibility of the add-to-cart confirmation modal.
- **quickOrderItem** (Object | null): Quick order item data if the user selects a quick order option.

## Methods

### Modal Control Methods

- **openAddToCartModal**: Opens the confirmation modal for adding the item to the cart.
- **closeAddToCartModal**: Closes the add-to-cart confirmation modal.

### Price Calculation and Updating

- **calculateTotalPrice**: Calculates the total price based on the base price, add-ons, and quantity. Returns the total price.
- **updateTotalPrice**: Updates the `totalPrice` by recalculating it through `calculateTotalPrice`.

### Fetching Data Methods

- **fetchQuickOrderItem(quickOrderId)**: Retrieves details of a quick order item by ID from the database, merges add-ons with saved quantities, and sets `quickOrderItem` to hold these details.
- **fetchFoodItem(foodItemId)**: Retrieves food item data by ID, sets the `foodItem`, and populates the add-ons.
- **fetchMerchant(merchantId)**: Fetches and sets merchant information for the given `merchantId`.
- **fetchCartItem(cartItemId)**: Retrieves cart item details by ID, merges add-ons with saved quantities, and sets `cartItem`.

### User Interaction Methods

- **increaseQuantity**: Increases the item quantity by 1 and updates the `totalPrice`.
- **decreaseQuantity**: Decreases the item quantity by 1, if greater than 1, and updates the `totalPrice`.
- **updateAddOn(updatedAddOn)**: Updates the quantity of a specific add-on and recalculates the `totalPrice`.
- **addToCartHandler**: Adds the item, with any customizations, to the user's cart in the database, or updates an existing cart item if editing.

### Navigation and Order Control

- **cancelOrder**: Redirects the user back to the hawker center page, discarding any changes.
