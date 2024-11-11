# Merchant Dashboard Component

## Table of Contents

1. [Overview](#overview)
2. [Props](#props)
3. [Data Properties](#data-properties)
4. [Methods](#methods)

## Overview

The `MerchantDashboard` component serves as a navigation hub for merchants to access various sections f the app, including toggling food availability, viewing orders, accessing the sales dashboard,and adding new food items. It displays navigation buttons styled with icons and text, organized in a grid layout.

## Props

No props are required for this component.

## Data Properties

- **user**: Boolean indicating if a user is authenticated.
- **orderData**: Array to store order-related data (not actively used in this component).
- **orderNumMap**: Object mapping for order numbers (not actively used in this component).

## Methods

### goToMerchantToggleAvailability()

Navigates the merchant to the food availability toggle page.

### goToMerchantOrders()

Routes the merchant to the orders page to view and manage incoming orders.

### goToMerchantSalesDashboard()

Directs the merchant to the sales dashboard for sales analytics and data.

### goToCreateFoodItem()

Takes the merchant to a form page where they can add a new food item to their menu.
