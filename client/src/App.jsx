// import routes
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Items from "./pages/Items";
import Bills from "./pages/Bills";
import Customers from "./pages/Customers";
import Cart from "./pages/Cart";

// components
import Header from "./components/Header";
import DefaultLayout from "./components/DefaultLayout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <DefaultLayout>
          <Routes>
            <Route path="*" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/items" element={<Items />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </DefaultLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
