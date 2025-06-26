// import routes
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";

// components
import Header  from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/home" element={<HomePage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
