# Terra Canvas
by Taein Um, Juyee Myoung, Daniel Yun, Albert Guan

## Overview
The goal for this project is to create a web application that develops how users interact with map graphics, enabling them to easily build, edit, and share map graphics

### DB/Deployment Server
    - MongoDB Atlas
    - Heroku

### Dependencies
    - @mapbox/mapbox-gl-geocoder: ^5.0.1
    - @mapbox/togeojson: ^0.16.0
    - @mui/icons-material: ^5.14.16
    - express: ^4.18.2
    - express-session: ^1.17.3
    - aws-sdk: ^2.1510.0
    - bcrypt: ^5.1.1
    - chai: ^4.3.10
    - cors: ^2.8.5
    - dotenv: ^16.3.1
    - jest: ^29.7.0
    - mongodb: ^6.2.0
    - mongoose: ^8.0.0
    - nodemailer: ^6.9.7
    - react: ^18.2.0
    - react-dom: ^18.2.0
    - react-router-dom: ^6.17.0
    - sharp: ^0.32.6
    - shpjs: ^4.0.4
    - togeojson: ^0.16.0
    
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
    (21 Test Cases - Jest)
    (21 Test Cases - SuperTest)

        cd server
        npm test

    #### SuperTest Results
    <img width="661" alt="스크린샷 2023-12-16 오후 6 01 37" src="https://github.com/JuyeeMyeong/CSE416_project/assets/87653966/238610f4-efe4-4dcc-a811-c8fb2c7048f6">

    #### Jest Results
    <img width="570" alt="스크린샷 2023-12-16 오후 6 03 00" src="https://github.com/JuyeeMyeong/CSE416_project/assets/87653966/727d975e-e5fa-491e-a0ea-979a240e75dc">


    <br><br>
    
  - Frontend Test (Cypress)
    (66 Test Cases)
      
        npm run cypress:run

    #### Cypress Results
    <img width="713" alt="스크린샷 2023-12-16 오후 5 22 10" src="https://github.com/JuyeeMyeong/CSE416_project/assets/87653966/4490cc6c-a984-4105-8930-557f15926713">


### CI/CD
    - CI: .github/workflow/CI.yml
    - CD: .github/workflow/CD.yml
