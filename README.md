# Basic Task Manager (React Native + Node.js)

A full-stack React Native To-Do Application with a Node.js/MongoDB backend. This project features JWT-based user authentication, full CRUD task management, and a custom "Smart Sorting" algorithm to intelligently order tasks by urgency.

## 🚀 Features

### Frontend (mobile-expo)
- **Framework:** React Native with Expo (SDK 52 compatible)
- **Language:** TypeScript
- **State Management:** Redux Toolkit
- **Navigation:** React Navigation (`Native Stack`)
- **UI/UX:** Premium dark-mode aesthetic with custom SVG icon integrations (`lucide-react-native`). Uses `@react-native-community/datetimepicker` for deadline selection.
- **Persistence:** `@react-native-async-storage` for retaining JWT sessions.

### Backend (backend)
- **Framework:** Node.js with Express
- **Database:** MongoDB (via Mongoose)
- **Language:** TypeScript
- **Authentication:** JWT (JSON Web Tokens) with `bcrypt` password hashing.
- **Smart Sorting Algorithm:** Tasks are returned from the API dynamically sorted based on a combined urgency score:
  1. Overdue tasks & tasks due in <24h are prioritized.
  2. High/Medium/Low priority multipliers.
  3. Completed tasks are always moved to the bottom.

---

## 🛠 Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB running locally on `mongodb://localhost:27017` (or modify `MONGO_URI` in the backend `.env`)
- Expo Go App on your mobile device (or an Android/iOS emulator)

### 1. Start the Backend
```bash
cd backend
npm install
npm run dev
```
*The backend will start on `http://localhost:5000`.*

### 2. Configure the Frontend API
If you are running on a physical device using Expo Go, ensure your phone and computer are on the same Wi-Fi network. 
1. Open `mobile-expo/src/api/index.ts`
2. Update the `baseURL` to match your computer's local IPv4 address (e.g., `http://192.168.X.X:5000/api`).

### 3. Start the Frontend (Expo)
```bash
cd mobile-expo
npm install
npx expo start -c
```
*Scan the generated QR code using the Expo Go app on your phone, or press `a`/`i` to launch in a local emulator.*

---

## 📁 Project Structure

```
/
├── backend/                  # Node.js API
│   ├── src/
│   │   ├── controllers/      # Route logic (Auth, Todos)
│   │   ├── middleware/       # JWT Auth Guads
│   │   ├── models/           # Mongoose Schemas
│   │   ├── routes/           # Express Routes
│   │   └── utils/            # Smart sorting algorithm
│   └── .env                  # Environment Variables
│
└── mobile-expo/              # React Native Frontend
    ├── src/
    │   ├── api/              # Axios configuration & interceptors
    │   ├── components/       # Reusable UI components (Input, Button, TodoItem)
    │   ├── navigation/       # Auth & App Navigators
    │   ├── screens/          # Login, Register, Home, AddTodo
    │   ├── store/            # Redux Slices & Thunks
    │   └── theme/            # Global styling constants (Colors, Typography)
    └── App.tsx               # Entry Point
```

## 📝 License
This project is open-source and available under the MIT License.
