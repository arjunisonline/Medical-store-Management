import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import MedicineList from "./components/medicinelist";

const router = createBrowserRouter([
    { path: '', element: <App /> },
    { path: 'login', element: <Login /> },
    { path: 'signup', element: <Signup /> },
    { path: 'medicinelist', element: <MedicineList /> }
]);

export default router;