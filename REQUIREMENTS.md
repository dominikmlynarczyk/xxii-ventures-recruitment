<div align="center">
  <picture width="572px">
    <source media="(prefers-color-scheme: dark)" srcset="./assets/readme-header-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="./assets/readme-header-light.png">
    <img alt="Shows a black logo in light color mode and a white one in dark color mode." src="./assets/readme-header-light.png">
  </picture>
</div>

# 🏛️ XXII Ventures | Recruitment task

The objective of this task is to develop a **React Native application** that includes:

1. Authentication, 
2. ChatGPT integration with:
   - message streaming, 
   - file/image attachments within the chat interface,
3. User profile management. 

The application should be well-structured, maintainable, and demonstrate expertise in React Native development.

### **Task requirements**

1. **Authentication Page (Mocked)**:
   1. Implement a simple login screen/page with **email and password authentication**.  
   2. Authentication needs to be mocked - use hardcoded credentials:  
      - *Email*: `test@example.com`  
      - *Password*: `password123`  
   3. Store login state securely.  
   4. Redirect users to the **chat page** after successful login.  
2. **Chat Page with AI Integration**:  
   1. Develop a **chat interface** where users can send and receive messages.  
   2. Integrate **OpenAI’s ChatGPT API** (or mock responses if user does not provide their API key).
   3. Implement **message streaming**, ensuring partial responses are displayed as they arrive.  
   4. Store chat history in memory for the current session.  
   5. File Upload & Sharing with ChatGPT:
      1. Allow users to **attach images or files** from their device within the chat interface.  
      2. Display a preview of the uploaded file before sending.  
      3. Ensure the **file is sent along with the user’s message** to ChatGPT.  
      4. Handle different file types appropriately and provide feedback to the user if an unsupported format is selected.  
   6. Optional: Speech-to-Text:
      1. Implement **speech-to-text functionality** to allow users to dictate messages instead of typing.
      2. Convert spoken input into text before sending it to ChatGPT.  
3. **Profile Page**:
   1. Display **user information** including name, email, and profile picture.  
   2. Allow users to **edit their profile**, with changes stored locally.  

**Navigation between pages:**  

- Implement **React Navigation** to enable seamless switching between the **Chat** and **Profile** pages.  
- Ensure a **navigation bar** is included for accessibility.  

### Task evaluation criteria  
Submissions will be evaluated based on the following criteria:  

- **Code Quality:** Clean, maintainable, and modular code structure.  
- **User Experience:** Smooth navigation, intuitive UI, and responsive interactions.  
- **Functionality:** Correct implementation of authentication, chat, file upload, and sharing features.  
- **Performance:** Efficient API handling for ChatGPT integration and streaming.  
- **State Management:** Proper handling of application state to ensure smooth interactions.  
- **Optional Bonus:** Implementation of speech-to-text for enhanced usability.  **