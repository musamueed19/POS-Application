// import routes
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Items from "./pages/Items";
import Bills from "./pages/Bills";
import Customers from "./pages/Customers";
import Cart from "./pages/Cart";
import Register from "./pages/Register";

// components
import Header from "./components/Header";
import DefaultLayout from "./components/DefaultLayout";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Routes with DefaultLayout */}
          <Route element={<DefaultLayout />}>
            <Route
              path="/home"
              element={
                <ProtectedRoutes>
                  <HomePage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/items"
              element={
                <ProtectedRoutes>
                  <Items />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoutes>
                  <Cart />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/bills"
              element={
                <ProtectedRoutes>
                  <Bills />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/customers"
              element={
                <ProtectedRoutes>
                  <Customers />
                </ProtectedRoutes>
              }
            />
            <Route path="/cart" element={<Cart />} />
          </Route>

          {/* Routes without DefaultLayout */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// Protected Routes
export const ProtectedRoutes = ({ children }) => {
  // const { user } = useSelector((state) => state.rootReducer);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isUser, setIsUser] = useState();

  useEffect(() => {
    if (localStorage.getItem("user")) setIsUser(true)
    else setIsUser(false);
    // Small delay to ensure Redux state is loaded
    const timer = setTimeout(() => setIsCheckingAuth(false), 200);
    return () => clearTimeout(timer);
  }, []);

  if (isCheckingAuth) return <Loader />; // Show loader while checking auth

  return isUser ? children : <Navigate to="/login" replace />;
};