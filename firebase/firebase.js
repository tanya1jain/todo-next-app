import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBTD_YDIaFEUAig_XIWZ4_GguJF1YjFOwg",
    authDomain: "todo-auth-app-46899.firebaseapp.com",
    projectId: "todo-auth-app-46899",
    storageBucket: "todo-auth-app-46899.appspot.com",
    messagingSenderId: "499704332561",
    appId: "1:499704332561:web:4657201bc8f48ecad28cb0",
    measurementId: "G-ZZ5F940GFL"
};

const app = initializeApp(firebaseConfig);

// ✅ Export auth
export const auth = getAuth(app);

// ✅ Conditionally initialize analytics (only in the browser)
if (typeof window !== "undefined") {
    import("firebase/analytics").then(({ getAnalytics }) => {
        getAnalytics(app);
    });
}
