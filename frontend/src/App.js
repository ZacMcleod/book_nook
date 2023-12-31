// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import BookDetailsPage from "./pages/BookDetailsPage/BookDetailsPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import SearchPage from "./pages/SearchPage/SearchPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<SearchPage />}/>
        <Route path="/details/:bookId" element={<PrivateRoute><BookDetailsPage /></PrivateRoute>} />
        <Route path="/user_favorites" element={<PrivateRoute><FavoritesPage /></PrivateRoute>} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
