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

### Structures
    - Frontend Directory: client
    - Backend Directory: server

### App Features
    - Map Editing and Storing
    - Map Posting and Sharing
    - Community Features
        - Posting Questions, Idea, Map
        - Commenting to a post
        - Like Function
        - Upload Image from Local
        - Upload Image/Map Data from storage
    - Search Posts and Maps

## Screenshot
### Main Landing Page
<img width="1700" alt="Main" src="https://github.com/JuyeeMyeong/CSE416_project/assets/87653966/db20d203-2dd2-410c-a1a5-eba640ac29c1">

### SignIn/Up
<img width="1700" alt="new" src="https://github.com/JuyeeMyeong/CSE416_project/assets/87653966/ab6d814a-9565-473d-bc7d-8913ab29b89e">

### Map Editing
<img width="1800" alt="map" src="https://github.com/JuyeeMyeong/CSE416_project/assets/87653966/fe8824d1-e3dd-43b0-b215-d7b923f9e7c6">

### Community
#### Community Landing Page
<img width="1000" alt="스크린샷 2023-12-18 오전 11 37 34" src="https://github.com/JuyeeMyeong/CSE416_project/assets/87653966/514b75e5-12ea-4d89-88a3-2ea135e30e46">

#### Posting Page
<br>
<img width="1000" alt="스크린샷 2023-12-18 오전 11 38 27" src="https://github.com/JuyeeMyeong/CSE416_project/assets/87653966/285df7d1-7126-437b-963d-ff5c16aed01c">

#### Load Map Data From Storage (Cloud)
<br>
<img width="1000" alt="스크린샷 2023-12-18 오전 11 38 35" src="https://github.com/JuyeeMyeong/CSE416_project/assets/87653966/33ebd55b-b0d5-4b71-8d10-f0ec9797e97f">

#### Preview Map   
<br>
<img width="1000" alt="스크린샷 2023-12-18 오전 11 38 44" src="https://github.com/JuyeeMyeong/CSE416_project/assets/87653966/d5b9fa50-2bdd-4e4c-81ca-8ba3a7db4c0f">

#### Post Page
<br>
<img width="1000" alt="스크린샷 2023-12-18 오전 11 39 05" src="https://github.com/JuyeeMyeong/CSE416_project/assets/87653966/736323d4-5721-433d-93de-98ea5e6a48c7">

#### Like and Comment Functions
<br>
<img width="1000" alt="스크린샷 2023-12-18 오전 11 39 14" src="https://github.com/JuyeeMyeong/CSE416_project/assets/87653966/ff9e67c8-3d1f-4a1e-a3f2-1fca30f591c9">



<br><br><br>



### Testing
  - Backend Test (Jest/SuperTest)

        cd server
        npm test

  - Frontend Test (Cypress)
      
        npm run cypress:run


### CI/CD
    - CI: .github/workflow/CI.yml
    - CD: .github/workflow/CD.yml
