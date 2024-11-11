# DiningOptionsPage Component

## Table of Contents

1. [Overview](#overview)
2. [Props](#props)
3. [Data Properties](#data-properties)
4. [Methods](#methods)

## Overview

The `DiningOptions` component provides a dropdown selection for users to choose a hawker center. It displays only open centers and includes a button to navigate to the selected center’s page. If no selection is made, a modal prompt the user to make a choice.

## Props

This component does not accept any props.

## Data Properties

- **user** (Object | Boolean): Stores the authenticated user object or `false` if the user is not authenticated.
- **hawkerCentres** (Array): Holds a list of available hawker centers with their names and statuses.
- **selectedHawkerCentre** (String): Stores the selected hawker center from the dropdown.
- **showHawkerModal** (Boolean): Controls the visibility of the modal prompting users to select a hawker center if none is selected.

## Methods

- **goHawkerCentrePage**: Checks if a hawker center has been selected. If so, it navigates the user to the selected center's page with the center’s name passed as a query parameter. If not, it displays a modal prompting the user to choose a center.

- **closeHawkerModal**: Closes the modal that prompts the user to select a hawker center.

- **fetchHawkerCentres**: Retrieves the list of hawker centers from the Firestore database, including each center’s name and status. Only centers with "Open" status are enabled in the dropdown selection.
