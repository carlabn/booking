# Instructions
A React Project to manage Places to book, and make some Bookings.
To change your firebase database or whatever you are using, go to src/lib/api.js and change the value of FIREBASE_DOMAIN for yours.

First, if you are not loged in, it will redirect you to /login.

### Normal User 
You can Log In with whatever invented email and more than 6 chars password and you will be able to:
1. See all the Bookings
2. Modify some of their data
3. Add new ones
4. Logout

### Admin User 
You can Log In with *admin@admin.com* and more than 6 chars password and you can see different options from the normal user. You will be able to:
1. Same options as a normal user (without adding bookings)
2. See all the places people can book
3. Modify their data 
4. Add new ones

### Features
- Able to order Bookings for most recent dates or the farthest.
- Able to order Places by name asc/desc.
- When modifying a booking, only can change dates and number of people.
- When modifying a place, you can change all but the location.
- When increasing/decreasing people, the total price changes for the recalculated one. 
- When changing the dates, if the number of nights has changed, also recalculates the total price.
- When we do a booking and select the location, it only shows the places on that location.
- When we validate a booking, it checks the dates, they are in the future, and end date also before start. Also checks if the rooms available for the selected place are equal or more than the people we are booking for.

### To do's
- Able to delete bookings and places.
- Double check all the validations because the error modal has broken with the changes.

There is still lots to improve though!!!🚀🚀🚀
