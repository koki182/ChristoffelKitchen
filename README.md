# Christoffel's Kitchen – Menu Manager

## Project Overview

Christoffel's Kitchen is a React Native application developed using Expo and TypeScript.

The application allows a private chef to create and manage a digital menu. The chef can add, view, edit, delete, search and filter dishes.

The application also displays menu statistics to help the chef understand the menu.

## Technologies Used

- React Native
- Expo
- TypeScript
- Expo Router
- React Context API
- AsyncStorage

## Application Features

### 1. Add Menu Items
The chef can enter a dish name, description, course and price. Input validation ensures that all required information is provided.

### 2. View Menu Items
The application displays menu items organised into Starters, Main Courses and Desserts.

### 3. Edit Menu Items
The chef can update existing dish information, including the name, description, course and price.

### 4. Delete Menu Items
The chef can remove dishes from the menu. A confirmation message helps prevent accidental deletion.

### 5. Search and Filter
Users can search for dishes by name and filter them according to their course. The Clear option resets the search and filter.

### 6. Menu Statistics
The application calculates and displays:

- Total number of menu items
- Overall average dish price
- Number of dishes in each course
- Average price for each course

### 7. Local Data Storage
AsyncStorage saves menu information locally so that dishes remain available after refreshing or restarting the application.

## Changelog – Improvements Since Part 2

The following improvements were made for the Final PoE:

1. Added the ability to edit existing menu items.
2. Added the ability to delete menu items.
3. Implemented search functionality using dish names.
4. Added filtering by Starter, Main Course and Dessert.
5. Added a Clear option to reset search and filter selections.
6. Added menu statistics, including average prices and course counts.
7. Created a reusable `MenuItemCard` component to reduce repeated code.
8. Created a reusable `CustomButton` component for consistent button styling.
9. Improved input validation and user feedback messages.
10. Improved navigation between application screens.
11. Implemented AsyncStorage to save menu items locally.
12. Improved the application's layout using a consistent cream, orange and brown colour scheme.

## How to Run the Application

1. Open the project in Visual Studio Code.
2. Open the terminal.
3. Install the required dependencies using `npm install`.
4. Start the application using `npx expo start --web --port 8082`.
5. Open the application in your browser.

## Testing

The application was tested for adding, editing, deleting, searching and filtering menu items.

Input validation, navigation and menu statistics were also checked.

Menu data persistence was tested by refreshing the browser and restarting Expo.

## Conclusion

Christoffel's Kitchen provides a simple and organised way for a private chef to manage menu items.

The Final PoE improvements make the application more functional, reusable and user-friendly.