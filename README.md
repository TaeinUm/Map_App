# Terra Canvas
by Taein Um, Juyee Myoung, Daniel Yun, Albert Guan

## Overview
The goal for this project is to create a web application that develops how users interact with map graphics, enabling them to easily build, edit, and share map graphics

### DB/Deployment Server
    - MongoDB Atlas
    - Heroku

### Dependencies
    - mapbox/mapbox-gl-geocoder : 5.0.1
    - mapbox/togeojson : 0.16.0
    - mui/icons-material : 5.14.16
    - express : 4.18.2
    - express-session : 1.17.3
    - ...

More details are in package.json

### Features
    - Map Editing and Storing
    - Map Posting and Sharing
    - Community Features: Posting Questions, Idea
    - Search Posts and Maps

## Screenshot
### Main Landing Page
<img width="1700" alt="Main" src="https://github.com/JuyeeMyeong/CSE416_project/assets/87653966/db20d203-2dd2-410c-a1a5-eba640ac29c1">

### SignIn/Up
<img width="1700" alt="new" src="https://github.com/JuyeeMyeong/CSE416_project/assets/87653966/ab6d814a-9565-473d-bc7d-8913ab29b89e">

### Map Editing
<img width="1800" alt="map" src="https://github.com/JuyeeMyeong/CSE416_project/assets/87653966/fe8824d1-e3dd-43b0-b215-d7b923f9e7c6">



### Testing
  - Backend Test (Jest/SuperTest)

        cd server
        npm test

  - Frontend Test (Cypress)
      
        cd cypress
        npm test


### CI/CD
    - CI: .github/workflow/CI.yml
    - CD: .github/workflow/CD.yml
