// import routes
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Routes with DefaultLayout */}
          <Route element={<DefaultLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/items" element={<Items />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/customers" element={<Customers />} />
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
