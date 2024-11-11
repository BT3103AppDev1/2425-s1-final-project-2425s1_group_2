# Merchant Sales Dashboard Component

## Table of Contents

1. [Overview](#overview)
2. [Props](#props)
3. [Data Properties](#data-properties)
4. [Methods](#methods)

## Overview

The `SalesDashboard` component provide a comprehensive view of merchants sales
performance. It includes features such as selecting a time period (day, week, or month),
visualizing revenue over time, viewing top-selling items, and summarizing sales metrics.

## Props

Props in subcomponents include:

- **selectedPeriod** (String): Selected period for data filtering, passed to subcomponents for dynamic data updates.

## Data Properties

- **selectedPeriod**: String - Tracks the currently selected time period for data display (e.g., `day`, `week`, `month`). Defaults to `'day'`.

## Methods

### updatePeriod(period)

Update the `selectedPeriod` based on the user's selection from `DashboardHeader`. Triggers reactive updates in child components to display data relevant to the chosen period.

### fetchOrders() (in subcomponents)

Fetches orders from Firestore for the authenticated merchant based on the `selectedPeriod`. Populates order data for sales calculation, revenue chart, and popular item listing.

### calculateSales() (in SalesOverview)

Calculates total sales amount and the count of completed orders for the chosen period. Uses `selectedPeriod` to filter orders, then aggregates total revenue and order count.

### calculateTopItems() (in PopularItems)

Determines the most popular items for the selected period by counting order quantities. Uses `selectedPeriod` to filter orders and identifies the top three food items based on sales volume.

### generateChartData() (in SalesChart)

Generates chart data for visualizing revenue over time within the selected period. Aggregates total revenue into time intervals (e.g., hours for day, days for week, weeks for month) and updates the chart dynamically.
