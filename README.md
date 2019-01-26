# mock-reservation-system

I was asked to create a mock reservation system. Two apps: the first is to provide an API for the reservation system — the second, a react-native app that uses the API.

**Play Store download**: https://play.google.com/store/apps/details?id=com.pliske_reservation
**video example:** https://youtu.be/jqJUWwZGlyA

## Tech Stack

-   React
-   React-Native
-   Express
-   GraphQL - Apollo
-   Nodejs

## To install:

1. Clone / download repo.
2. cd to repo directory.
3. `cd frontend` and run `yarn` or `npm i`.
4. cd back out to main repo, and then `cd backend` and run `yarn` or `npm i`.
5. You've now installed the _frontend_ and _backend_.
6. You might want to open some terminal tabs for the rest of this.
7. Open **backend/app.js**, and replace the **process.env.DBPATH** environmental variable with a URL to your own DB instance. Mine was an mLab Mongo DB URL.
8. Tab #1, cd to backend, and run `npm start`. Local GraphQL server now running.

## Have Android Studio / emulator running?

1. Open new tab, cd to _frontend_, and run `react-native run-android`.
2. **Debugging:** Open new tab, cd to _frontend_, and run `react-native log-android`.
3. **Emulator hot loading:** Select emulator, Command + m, choose hot reloading.
4. **Device hit reloading:** Shake Android phone, choose hot reloading.

## Have iOS Simulator running?

1. Open new tab, cd to _frontend_, and run `react-native run-ios`.
2. **Debugging:** Command + d should open up a good debugger.
3. **Hot reloading:** Command + d, choose hot reloading.

## Download React Native app from PlayStore

Coming soon.

### Gotchas

-   use IP, not localhost in client
-   Make sure to call `if (data.loading)`... otherwise will think array is empty.
