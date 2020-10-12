# Contents

- Description
- Technologies
- Challenges
- Preview

# Description

Site allowing family and friends to see photos and videos from our wedding.

# Technologies

- HTML/CSS/JavaScript
- React/Redux
- Node.js/Express
- MySQL

# Packages

## Style Guide

- npm i eslint eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
- npm i @imaginary-cloud/prettier-config
  - ./node_modules/.bin/eslint --init
    - **(selected AirBnB style/eslint.json)**

## Front End

- npx i create-react-app
- npm i react-router-dom
- npm i react-html-parser
- npm i @babel/cli
- npm i axios
- npm i swr

**Get User Info:**

- npm i react-device-detect
- 'https://extreme-ip-lookup.com/json/' w/ Axios

**Redux:**

- npm i redux
- npm i react-redux
- npm i redux-thunk

### @babel/cli

In the absence of TypeScript, this will remove all comments during build. Once installed, make sure the following lines are in your **package.json** file.

```
"devDependencies": {
    "@babel/cli": "^7.11.6"
  },
  "build": "babel ./index.js --out-dir ./dist/index.js --no-comments"
```

## Back End

- npm i express
- npm i body-parser
- npm i mysql2
- npm i helmet
- npm i cors
- npm i rand-token
- npm i bcrypt

### Using rand-token and bcrypt

**Generate Rand Token:**

```
const suid = require("rand-token").suid;
const token = suid(16);
console.log(token);
```

**bcrypt: Hash Password:**

```
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "LOGIN_PASSWORD_HERE";
bcrypt.genSalt(saltRounds, function (err, salt) {
  bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
    console.log(hash);
  });
});
```

**bcrypt: Check Password:**

```
const { correctPasswordHash } = require("../util/password");
const suid = require("rand-token").suid;
const rand_token = suid(16);

router.post("/", (req, res, next) => {
  const submittedPassword = req.body.password;

  bcrypt.compare(submittedPassword, correctPasswordHash, function (err, result) {
    if (result) {
      // Success ... res.json(rand_token) and submit random token along with user ip address and their current browser used to database
    } else {
      // Failure
    }
  });
});
```
