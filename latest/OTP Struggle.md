# 📱 OTP Authentication Learning Project

> A beginner-friendly journey to understanding and implementing OTP (One-Time Password) authentication using both **manual backend logic** and **Firebase Phone Authentication**.

---

# 📚 Project Goal

The purpose of this project is **not just to build OTP authentication**, but to understand **how it actually works behind the scenes**.

Instead of copying code from tutorials, this project is built step-by-step while learning the concepts involved in authentication systems used in real-world applications.

---

# 🚀 Phase 1 - Manual OTP Authentication

In the first phase, the entire OTP system was implemented manually using React and Express.

## Tech Stack

- React
- Express.js
- Node.js
- Axios
- React Hook Form

---

## Architecture

```text
User

↓

Enter Phone Number

↓

React Frontend

↓

POST /send-otp

↓

Express Backend

↓

Generate Random OTP

↓

Store OTP in Memory

↓

Return OTP (for learning)

↓

User enters OTP

↓

POST /verify-otp

↓

Compare OTP

↓

Delete OTP

↓

Verification Successful
```

---

## Features Implemented

### ✅ OTP Generation

Random 6-digit OTP generated using

```javascript
Math.floor(Math.random() * 900000) + 100000
```

---

### ✅ OTP Storage

Instead of storing only one OTP,

each phone number has its own OTP.

```javascript
otpStore = {

    "9876543210":{

        otp:"123456",

        expiresAt:...

    }

}
```

---

### ✅ OTP Expiration

Every OTP expires after

```
5 Minutes
```

using

```javascript
expiresAt: Date.now() + 5 * 60 * 1000
```

---

### ✅ OTP Verification

The backend verifies

- Phone number exists
- OTP exists
- OTP has not expired
- OTP matches

---

### ✅ One-Time Password

After successful verification,

the OTP is deleted.

```javascript
delete otpStore[phone];
```

This ensures the OTP cannot be reused.

---

## Improvements Learned

✔ Correct OTP generation formula

✔ Store OTP per phone number

✔ OTP expiration

✔ Delete OTP after verification

✔ Better validation

✔ Better React state management

---

# 🔥 Phase 2 - Firebase Phone Authentication

After understanding manual OTP generation,

the next step is learning how real production applications handle OTP authentication.

Instead of generating OTP ourselves,

Firebase takes care of

- OTP Generation
- SMS Delivery
- OTP Verification
- Spam Protection
- Rate Limiting
- Security

---

## Manual OTP vs Firebase OTP

### Manual OTP

```text
React

↓

Express

↓

Generate OTP

↓

Store OTP

↓

Verify OTP

↓

Delete OTP
```

---

### Firebase OTP

```text
React

↓

Firebase Authentication

↓

Generate OTP

↓

Send SMS

↓

Verify OTP

↓

Firebase User

↓

Express Backend

↓

Generate JWT

↓

Login
```

Notice that the backend is no longer responsible for generating or verifying OTP.

Firebase handles everything securely.

---

## Firebase Setup Completed

### ✅ Firebase Project Created

Project Name

```
OtpProviderApiHandling
```

---

### ✅ Authentication Enabled

Phone Authentication enabled.

---

### ✅ Authorized Domains

```
localhost
```

added successfully.

---

### ✅ Firebase SDK Installed

```bash
npm install firebase
```

---

### ✅ Firebase Configuration Created

```text
src/

└── firebase.js
```

which initializes

- Firebase App
- Firebase Authentication

---

# 📖 Concepts Learned So Far

## What is Firebase?

Firebase is a Backend-as-a-Service (BaaS) platform by Google.

It provides

- Authentication
- Database
- Storage
- Hosting
- Cloud Functions
- Analytics

For this project we are using only

```
Firebase Authentication
```

---

## Why Use Firebase?

Instead of building

- OTP Generator
- SMS Service
- Expiration Logic
- Spam Prevention
- Bot Detection

Firebase already provides all of them.

---

## Why Does Firebase Need reCAPTCHA?

Before sending an OTP,

Firebase verifies that

```
A real human is requesting the OTP.
```

This prevents

- SMS abuse
- Spam attacks
- Millions of fake OTP requests

---

# 📂 Current Folder Structure

```text
client/

│

├── src/

│      firebase.js

│      App.jsx

│

└── package.json

server/

│

├── controllers/

├── routes/

├── server.js

└── package.json
```

---

# 📌 What We'll Learn Next

The Firebase project is now configured.

The next phase focuses on implementing real OTP authentication.

---

## Upcoming Topics

### 1️⃣ Understanding RecaptchaVerifier

- Why it is required
- Invisible reCAPTCHA
- Human verification
- Security

---

### 2️⃣ Sending OTP

Using

```javascript
signInWithPhoneNumber()
```

---

### 3️⃣ OTP Verification

Using

```javascript
confirmationResult.confirm()
```

---

### 4️⃣ Firebase User

Understanding

- User object
- Authentication state
- Login flow

---

### 5️⃣ Firebase ID Token

Learn

- What an ID Token is
- Why Express backend needs it

---

### 6️⃣ Backend Verification

Verify Firebase ID Token

using Firebase Admin SDK.

---

### 7️⃣ JWT Authentication

After Firebase verification,

our own backend will generate

```
JWT Access Token
```

for protected APIs.

---

### 8️⃣ MongoDB Integration

Automatically

- Create User
- Login Existing User
- Store User Profile

---

### 9️⃣ Production-Level Authentication Flow

```text
User

↓

Enter Phone

↓

Firebase

↓

SMS

↓

OTP Verification

↓

Firebase User

↓

Firebase ID Token

↓

Express Backend

↓

Verify Token

↓

MongoDB

↓

JWT

↓

Protected Routes
```

---

# 🎯 Final Goal

Build a complete production-ready OTP authentication system using

- React
- Firebase Authentication
- Express.js
- MongoDB
- JWT

while understanding every concept instead of simply copying code.

---

# 👨‍💻 Author

**Ayush Rawat**

Learning MERN Stack by building real-world projects from scratch while understanding every concept in depth.