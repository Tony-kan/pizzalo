<div align="center">
  <br />

  <br />
  <div>
    <img src="https://img.shields.io/badge/-Expo-black?style=for-the-badge&logoColor=white&logo=expo&color=000020" alt="expo" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Supabase-black?style=for-the-badge&logoColor=white&logo=supabase&color=3ECF8E" alt="supabase" />
  </div>

<h3 align="center">Pizzalo App</h3>

</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## <a name="introduction">🤖 Introduction</a>

Pizzalo, a mobile application for pizza lovers, featuring dynamic pizza listings and order management. Designed with modern tools like Expo SDK 52, Supabase, and TypeScript for a seamless and scalable experience.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Expo
- React Native
- TypeScript
- Supabase

## <a name="features">🔋 Features</a>

👉 **Onboarding**: A smooth onboarding experience for new users.

👉 **Email-Password Authentication**: Traditional authentication method using email and password.

👉 **Menu Screen**: Displays the latest pizza products with powerful search and filter functionality.

👉 **Details Screen**: Provides comprehensive information about individual pizza products, including images and key details.

👉 **Order Screens**: Allows users to view their orders.

👉 **Shopping Cart Screen**: Enables users to manage their shopping cart efficiently.

👉 **Admin Section**: Allows admins to create, update, and delete pizza products, and update delivery status.

and many more, including code architecture and reusability

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

````bash
git clone https://github.com/Tony-kan/pizzalo.git
cd pizzalo


**Installation**

```bash
npm install
````

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Replace the values with your actual Supabase credentials. You can obtain these credentials by signing up & creating a
new project on the [Supabase website](https://supabase.io).

**Start the app**

```bash
 npx expo start
```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project
uses [file-based routing](https://docs.expo.dev/router/introduction).
