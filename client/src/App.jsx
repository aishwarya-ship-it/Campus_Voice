import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Complaint from "./pages/Complaint";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import StudentLogin from "./pages/StudentLogin";

import "./App.css";

function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/student-login"
                    element={<StudentLogin />}
                />

                <Route
                    path="/complaint"
                    element={<Complaint />}
                />

                <Route
                    path="/contact"
                    element={<Contact />}
                />

                <Route
                    path="/admin-login"
                    element={<AdminLogin />}
                />

                <Route
                    path="/admin"
                    element={<Admin />}
                />

            </Routes>

            <Footer />

        </BrowserRouter>

    );
}

export default App;