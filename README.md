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

- 🎙️ [Demonstration video](https://www.loom.com/share/ca55d2f28d7648ada3e10a9d390897f8?sid=fd7bdc24-e49e-4156-bd16-9d2564bb36d3)
- 👷 [Codebase high level overview](https://www.loom.com/share/49608d4115084eb9935afa1bcc69ec76?sid=ecde4e9f-4fc5-459d-b651-9a431299094c)

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

**Important**: The web app must be running to enable OpenAI API communication. The native app communicates with the OpenAI API through the web app's API routes.

**Environment Setup**:
1. Copy `.env.example` to `.env` in the `apps/web` directory
2. Configure the following environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key (required for AI chat functionality)
   - `NEXT_PUBLIC_API_URL`: URL of your web app (default: http://localhost:3000)

Without the OpenAI API key, the app will fall back to mocked assistant messages.

**Steps to Run**:

1. Install dependencies: 
```bash
yarn
```

2. Start the web app (required for OpenAI API communication):
```bash
yarn web
```

3. Optional - Run native app:
   - Local dev through Expo: `yarn native`
   - Platform specific builds:
     - iOS: `yarn ios`
     - Android: `yarn android`
   - Create development build: `yarn native:rebuild`

For web production build with optimization: `yarn web:prod`

## 🛠️ Tech Stack

Key technologies used in the project:

- 📦 **[Turborepo](https://turbo.build/)** - monorepo build system
- 🎨 **[Tamagui](https://tamagui.dev)** - UI library
- 🚦 **[Solito](https://solito.dev)** - cross-platform navigation
- 📱 **[Expo SDK](https://expo.dev)** - native app development
- 🌐 **[Next.js](https://nextjs.org)** - web app development
- 🚦 **[Expo Router](https://expo.dev/router)** - native routing with similar conventions to file-based routing from Next.js

**Special Features**:
- 🎤 **Speech-to-Text**: Implemented using Web Speech API for web and Voice Control API for iOS, enabling real-time voice input in the chat interface
- 📝 **Markdown Formatting**: Utilizes react-markdown with remark-gfm plugin for rendering rich text content including code blocks and tables
- 🤖 **AI Integration**: Uses Vercel AISDK with streaming responses for enhanced AI interactions
- 🖼️ **Image Attachments**: Supports image uploads in chat messages `expo-image-picker` for native & web platforms

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



