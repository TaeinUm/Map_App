# Terra Canvas
by Taein Um, Juyee Myoung, Daniel Yun, Albert Guan

## Overview
The goal for this project is to create a web application that develops how users interact with map graphics, enabling them to easily build, edit, and share map graphics
<br><br>

#### DB/Deployment Server
    - MongoDB Atlas
    - Heroku

#### Dependencies
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
<br><br>

#### Structures
    - Frontend Directory: client
    - Backend Directory: server

#### App Features
    - Map Editing and Storing
    - Map Posting and Sharing
    - Community Features
        - Posting Questions, Idea, Map
        - Commenting to a post
        - Like Function
        - Upload Image from Local
        - Upload Image/Map Data from storage
    - Search Posts and Maps
<br><br>

## Features
#### Home Page
<img width="1700" alt="Main" src="https://github.com/JuyeeMyeong/CSE416_project/assets/87653966/db20d203-2dd2-410c-a1a5-eba640ac29c1">
<br><br>

#### SignIn/Up
<img width="1700" alt="new" src="https://github.com/JuyeeMyeong/CSE416_project/assets/87653966/ab6d814a-9565-473d-bc7d-8913ab29b89e">
<br><br>

### Maps
<img width="1002" alt="스크린샷 2023-12-18 오후 12 24 17" src="https://github.com/JuyeeMyeong/CSE416_project/assets/131139887/8912c485-f861-4b07-9c08-8cdc0958a663">
<br><br>

#### Heat Map
<img width="1409" alt="스크린샷 2023-12-18 오후 12 25 46" src="https://github.com/JuyeeMyeong/CSE416_project/assets/131139887/58df67f8-48f9-45dd-999e-797a1cecb1ce">
<br><br>

#### Point Map
<img width="1409" alt="스크린샷 2023-12-18 오후 12 26 59" src="https://github.com/JuyeeMyeong/CSE416_project/assets/131139887/32466f88-cff6-4e9d-8944-3521681f1b1b">
<br><br>

#### Regional Map
<img width="1412" alt="스크린샷 2023-12-18 오후 12 27 28" src="https://github.com/JuyeeMyeong/CSE416_project/assets/131139887/13efd74f-ccf6-4ebd-8979-2c2c10d70db1">

#### Flow Map
<img width="1408" alt="스크린샷 2023-12-18 오후 12 28 28" src="https://github.com/JuyeeMyeong/CSE416_project/assets/131139887/536c8c74-6550-4ddd-82a8-e89e0fd3b6f5">

#### 3D-Bar Map
<img width="1414" alt="스크린샷 2023-12-18 오후 12 29 10" src="https://github.com/JuyeeMyeong/CSE416_project/assets/131139887/c7482d59-6e97-4635-ab65-3c33d5256345">
<br><br>

#### Basic Map
<img width="1408" alt="스크린샷 2023-12-18 오후 12 31 45" src="https://github.com/JuyeeMyeong/CSE416_project/assets/131139887/81f4efd1-0ba3-45d9-9ebe-8968e47532e3">
<br><br>

### Map Editing
<img width="1411" alt="스크린샷 2023-12-18 오후 12 33 58" src="https://github.com/JuyeeMyeong/CSE416_project/assets/131139887/7fb6b555-83db-49db-974c-0f9e172ec641">
<br><br>

### Community
#### Community Landing Page
<img width="1000" alt="스크린샷 2023-12-18 오전 11 37 34" src="https://github.com/JuyeeMyeong/CSE416_project/assets/87653966/514b75e5-12ea-4d89-88a3-2ea135e30e46">

#### Posting Page
<img width="1000" alt="스크린샷 2023-12-18 오전 11 38 27" src="https://github.com/JuyeeMyeong/CSE416_project/assets/87653966/285df7d1-7126-437b-963d-ff5c16aed01c">

#### Load Map Data From Storage (Cloud)
<img width="1000" alt="스크린샷 2023-12-18 오전 11 38 35" src="https://github.com/JuyeeMyeong/CSE416_project/assets/87653966/33ebd55b-b0d5-4b71-8d10-f0ec9797e97f">

#### Preview Map
<img width="1000" alt="스크린샷 2023-12-18 오전 11 38 44" src="https://github.com/JuyeeMyeong/CSE416_project/assets/87653966/d5b9fa50-2bdd-4e4c-81ca-8ba3a7db4c0f">

#### Post Page
<img width="1000" alt="스크린샷 2023-12-18 오전 11 39 05" src="https://github.com/JuyeeMyeong/CSE416_project/assets/87653966/736323d4-5721-433d-93de-98ea5e6a48c7">

#### Like and Comment Functions
<img width="1000" alt="스크린샷 2023-12-18 오전 11 39 14" src="https://github.com/JuyeeMyeong/CSE416_project/assets/87653966/ff9e67c8-3d1f-4a1e-a3f2-1fca30f591c9">



<br><br><br>



## Testing
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
