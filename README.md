# Open Roaders
***by Alex & Eddie***

## With our first project we wanted to be able to solve the age old user story: **Planning a road trip is difficult!**
### In short our website allows user's to see their trip plotted on the map, take a peak at the overall trip metrics, and see how the weather will look over the next 5 days. 
---
## Instructions For Use:
1. Start typing an address in the starting location box
2. Select the location from the autocomplete search box
3. Repeat for the destination box. 
4. If desired, add up to **23** waypoints. 
5. Select the type of vehicle you will be using for the trip. 
6. Please submit to see your trip!

## Tech Used
* Google Maps JavaScript API
    * Directions service
    * Places library
    * Converted all pins to geocodes on the map in the way of Latitude and Longitude
* OpenWeather API
    * Geocode allowed for successful query regardless of input (address vs city, state)
* Concurrent Axios Callback
    * Able to return multiple callbacks with only 1 call. 
* JQuery
* Bootstrap

## What can you do? 
We discovered that our application has 2 different routes of functionality involving the Open Road. 
### Option 1 - Plan Road Trips
With Option 1 you can return the following: 
* Robust map visualization
    * Full Google Maps functionality including: Street View, Satelite View, CTRL + Scroll to zoom, & ability to drag pins
* 5 Days Weather Forecast for start and end locations
* Duration of trip in minutes, hours and days. 
* Distance in miles of the trip. 
* Cost of gas based on the type of car selected. 
### Option 2 - Route Optimization
Option 2 specializes in:
* Delivery Service
* Collection Service
* Errand Running
* Route coordination
    * It does this by optimizing up to **23 different waypoints** not including the initial start and end location.
    * Users will be able to use the same address for the start and end, then our app will determine the most efficient loop to hit each waypoint. 