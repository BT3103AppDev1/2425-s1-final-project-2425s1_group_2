# SwiftServe App

Welcome to **SwiftServe**

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Installation](#installation)
4. [Links](#links)
5. [Component Documentation](#component-documentation)
6. [Tech Stack](#tech-stack)

## Project Overview

Hawker centres form an integral part of Singaporean culture, with individuals from all walks of life patronising them for affordable and convenient access to a diverse set of local delights. Yet, hawker centres continue to face stresses with coping with overcrowding and seating availability. Customers often experience waiting times of over 90 minutes for meals and seating, especially during peak dining periods and near popular hawker stalls. The once joyful experience of dining out has become a stressful ordeal.

Swiftserve aims to bring the joy of dining back to hawker centres. By eliminating the stress of waiting and queuing, everyone can better savour their meal and connect with the hawker culture. Swiftserve brings together Customers and Merchants to form a creative platform, aimed at revolutionising how Customers queue and gain access to seats at hawker centres. It integrates queue-management as well as time-based seat-allocation, allowing Customers to place hawker meal orders ahead of time whilst guaranteeing seats during meal crowds. By decreasing time spent waiting and searching for seats, Swiftserve aims to decrease operational bottlenecks and improve the Customer experience.

Our platform is designed to cater to a diverse spread of Customers. These include working adults and tech-savvy youth who wish to utilise innovative solutions for efficient meal breaks. Swiftserve allows Customers to sign up and locate the Hawker centre of choice, place meal orders and reserve seats. Customers will also be informed of seat availability through the website application.

Following the SCRUM framework and two sprints, we completed all 39 user stories in our Product Backlog. We carried out the SCRUM steps of Sprint planning, biweekly stand-ups, Sprint reviews and retrospectives. Google Sheets was utilised to keep a count on the progress of our Product Backlog as well as to keep track of our Sprint burndown and completion rates. Github was utilised to allow for parallel development of our web application by our SCRUM Team.

The successful development and deployment of Swiftserve reinforces our belief that there will be a day where we can associate hawker centres with convenience, efficiency and an exceptional dining experience. We invite Customers and Merchants who want to reignite and enjoy the hawker culture that we all know and love. Together, we can keep this tradition going forward and showcase the definitive hawker experience.

## Features

- **User Authentication**: Sign up, log in, or continue as a guest.
- **Responsive UI**: Mobile-friendly design for seamless navigation.
- **Firebase Integration**: Leveraging Firebase for secure and flexible authentication.
- **Guest Access**: Anonymous access for quick browsing.

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/__yourusername__/swiftserve.git
   ```
   
## Links
- **Website**: temp
- **Report**: [Google Docs Report](https://docs.google.com/document/d/1xUwb5i4W0DyZl7FTQsk9MlslCP3sH6febfz2I6mYMko)
- **SCRUM Artefacts**: [Google Sheets](https://docs.google.com/spreadsheets/d/1ueJn2JwjhaqiG9cdCe3_ObOGjGLzcYZ6yf6P95tBwYU)
- **Videos**:
  - [Customer Perspective](https://drive.google.com/file/d/1yrSCohnwyE_xvFwrvaDGgifDXTcbyCIz/view?resourcekey)
  - [Merchant Perspective](https://drive.google.com/file/d/1ohaHYvC7wGCyzjYHHkW93iE5mh0LhK0i/view?resourcekey)

## Component Documentation
Detailed component documentation can be found in the `docs` folder within the `components` directory:
- [Welcome Page Component (Figure 3)](./SwiftServe1.0.0/src/components/docs/WelcomePage.md)
- [Sign Up Page Component (Figure 4)](./SwiftServe1.0.0/src/components/docs/SignUpPage.md)
- [Login Page Component (Figure 5)](./SwiftServe1.0.0/src/components/docs/LoginPage.md)
- [Profile Page Component (Figure 6)](./SwiftServe1.0.0/src/components/docs/ProfilePage.md)
- [Customer Dashboard Page Component (Figure 7)](./SwiftServe1.0.0/src/components/docs/CustDashboardPage.md)
- [Dining Options Page Component (Figure 8)](./SwiftServe1.0.0/src/components/docs/DiningOptionsPage.md)
- [Hawker Centre Page Component (Figure 9)](./SwiftServe1.0.0/src/components/docs/HawkerCentrePage.md)
- [Food Item Page Component (Figure 10)](./SwiftServe1.0.0/src/components/docs/FoodItemPage.md)
- [Checkout Page Component (Figure 11)](./SwiftServe1.0.0/src/components/docs/CheckoutPage.md)
- [Payment Success Page Component (Figure 12)](./SwiftServe1.0.0/src/components/docs/PaymentSuccessPage.md)
- [Seat Booking Page Component (Figure 13)](./SwiftServe1.0.0/src/components/docs/SeatBookingPage.md)
- [Live Receipts Page Component (Figure 14)](./SwiftServe1.0.0/src/components/docs/LiveReceiptsPage.md)
- [Merchant Dashboard Page Component (Figure 15)](./SwiftServe1.0.0/src/components/docs/MerchantDashboardPage.md)
- [Merchant Toggle Availability Page Component (Figure 16)](./SwiftServe1.0.0/src/components/docs/MerchantToggleAvailabilityPage.md)
- [Merchant Orders Page Component (Figure 17)](./SwiftServe1.0.0/src/components/docs/MerchantOrdersPage.md)
- [Merchant Sales Dashboard Page Component (Figure 18)](./SwiftServe1.0.0/src/components/docs/MerchantSalesDashboardPage.md)
- [Reset Password Page Component (Figure 19)](./SwiftServe1.0.0/src/components/docs/ResetPasswordPage.md)

## Tech Stack
- **Frontend**: JavaScript, HTML, CSS, Vue
- **Backend**: Firebase
