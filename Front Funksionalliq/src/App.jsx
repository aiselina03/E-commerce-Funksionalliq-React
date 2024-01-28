import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddPage from "./pages/AddPage";
import MainLayout from "./layouts/MainLayout";
import Basket from "./pages/Basket";
import Wishlist from "./pages/Wishlist";
import Detail from "./pages/Detail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route  element={<MainLayout />}>
            <Route  path="/" element={<Home />} />
            <Route path="/addPage" element={<AddPage />} />
            <Route path="/detail/:id" element={<Detail/>} />
            <Route path="/basket" element={<Basket/>} />
            <Route path="/wishlist" element={<Wishlist/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
