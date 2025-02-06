<div align="center">
  <picture width="572px">
    <source media="(prefers-color-scheme: dark)" srcset="./assets/readme-header-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="./assets/readme-header-light.png">
    <img alt="Shows a black logo in light color mode and a white one in dark color mode." src="./assets/readme-header-light.png">
  </picture>
</div>

# 🏛️ XXII Ventures | Recruitment task

Recruitment task requirements can be found in **[REQUIREMENTS file](./REQUIREMENTS.md)**.

## 🎥 View Demo

[Demonstration video]()

## 🏁 Start the **app**
**Prerequisites**:
- 🦕 Required Node.js version 22 (LTS), verify using:

```bash
node --version
```

- 🧶 Yarn 4.5.0 

```bash
yarn --version
```

- 📱 For iOS development (native / iOS simulator):
  - Xcode 15 or newer
  - iOS Simulator (macOS only) or connected physical device
- 🤖 For Android development:
  - Android Studio & Android SDK
  - Android Emulator or connected physical device

> **OPEN AI API KEY**
>
> Prepare the OpenAI API key. Without it in the app, you'll be getting the assistant's mocked messages.

**Steps**:

- Install dependencies: `yarn`
- Native (through Expo) local dev: `yarn native`
- Native prebuilt / development build, use `yarn native:rebuild`; platform specific commands:
  -  iOS: `yarn ios`
  - Android: `yarn android`

- Web local dev: `yarn web`
  - To run with optimizer on in dev mode (just for testing, it's faster to leave it off): `yarn web:extract`. To build for production `yarn web:prod`.


## 🛠️ Tech Stack

Key technologies used in the project:

- 📦 **[Turborepo](https://turbo.build/)** - monorepo build system
- 🎨 **[Tamagui](https://tamagui.dev)** - UI library
- 🚦 **[Solito](https://solito.dev)** - cross-platform navigation
- 📱 **[Expo SDK](https://expo.dev)** - native app development
- 🌐 **[Next.js](https://nextjs.org)** - web app development
- 🚦 **[Expo Router](https://expo.dev/router)** - native routing with similar conventions to file-based routing from Next.js

## 🗂 Application structure

The main apps are:

- `apps` - native and web apps:
  - `apps/native` | `@xxii-ventures/native-app` - native app source code
  - `apps/web` | `@xxii-ventures/web-app` - web app source code

- `packages` shared packages across apps:
  - `xxii-ventures/ui` includes your custom UI kit that will be optimized by Tamagui, following the [design systems guide](https://tamagui.dev/docs/guides/design-systems); shared custom UI elements
  - `@xxii-ventures/app` you'll be importing most files from `app/`
    - `features` - domain-aggregated application functionality 
    - `provider` - all the providers that wrap the app, and some no-ops for Webz

## Deploying to Vercel

- Root: `apps/next`
- Install command to be `yarn set version stable && yarn install`
- Build command: leave default setting
- Output dir: leave default setting

## Using With Expo Application Services (EAS)

EAS has already been configured, commands to run:

- `npm install --global eas-cli`

- `cd apps/native`

- `eas build` - This will also add EAS project ID to `app.json`



