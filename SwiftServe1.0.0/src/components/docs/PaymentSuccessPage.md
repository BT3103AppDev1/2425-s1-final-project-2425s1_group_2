# Payment Success Components

## Table of Contents

1. [Overview](#overview)
2. [Props](#props)
3. [Data Properties](#data-properties)
4. [Methods](#methods)

## Overview

The `DineIn` and `Takeaway` component provide user feedback following successful payment for dining in or takeaway orders, respectively. Each component displays the order status and includes navigation options: selecting a seat for dine-in or viewing the receipt for takeaway.

## Props

No props are required for these component.

## Data Properties

No specific data properties are defined.

## Methods

### SelectSeat

Navigates the user to the `/seatBooking` route to choose seating for dine-in orders.

### ToReceipts

Redirects the user to the `/liveReceipt` page, where they can view their takeaway receipt.
