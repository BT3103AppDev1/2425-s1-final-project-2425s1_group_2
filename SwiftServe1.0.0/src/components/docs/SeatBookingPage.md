# Seat Booking Component

## Table of Contents

1. [Overview](#overview)
2. [Props](#props)
3. [Data Properties](#data-properties)
4. [Methods](#methods)

## Overview

This `SeatBooking` component enables users to select seats within a dining area, taking into account seat availability, user-defined limits, and peak-time constraints. After selection, users can save their choices to Firestore and navigate to the receipt page.

## Props

No props are required for this component.

## Data Properties

- **seatsChosen**: Array of selected seat IDs.
- **numSeatsChosen**: Count of currently selected seats.
- **maxSeats**: Maximum number of seats allowed per user.
- **name**: Display name of the user.
- **email**: Email of the user.
- **user**: Current authenticated user object.
- **showMaxModal**: Boolean flag to toggle the display of the max seat selection modal.
- **showNoSeatModal**: Boolean flag to toggle the display of the no seat selected modal.
- **mapDiningTime**: Mapping of dining time slots to start time, end time, and peak status.
- **startTime**: Selected start time of dining.
- **endTime**: Selected end time of dining.
- **peak**: Boolean indicating whether the selected time is during peak hours.

## Methods

### addSeat(seatId)

Adds a seat to the `seatsChosen` list and increments `numSeatsChosen`.

### removeSeat(seatId)

Removes a seat from the `seatsChosen` list and decrements `numSeatsChosen`.

### async saveToFS()

Saves the selected seats and booking details to Firestore. If no seats are selected, triggers the `showNoSeatModal` modal.

### disableSeat(seatId)

Disables a specific seat button in the UI.

### setProfile()

Sets the user profile information (name and email) based on the authenticated user.

### closeModal()

Closes any open modal, resetting `showMaxModal` and `showNoSeatModal` to `false`.

### async getDiningTime()

Fetches the dining time preferences of the user from Firestore, setting `startTime`, `endTime`, and `peak` based on the dining time selection.

### parseTime(timeString)

Parses a time string (e.g., "1230") and returns a Date object representing that time for the current day.
