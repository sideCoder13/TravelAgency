import Homepage from "./page/homepage"
import Details from "./page/detail"
import Navbar from "./componenets/Navbar";
import UserDetails from "./page/UserDetails";
import AdminDashboard from "./page/Admin";
import AdminLogin from "./page/AdminLogin";
import InvoiceGeneration from "./page/invoice";
import "./index.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useContext } from "react";
import { AppContext } from "./context/context";

function App() {
  const {token} = useContext(AppContext)
  console.log(token);
  return (
    <div className="w-full h-full bg-gray-900">
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/details/:id" element={<Details/>} />
          <Route path="/submit/:id" element={<UserDetails/>} />
          <Route path="/admin" element={token ? <AdminDashboard/>  : <Homepage/>} />
          <Route path="/login" element={<AdminLogin/>} />
          <Route path="/invoice/:id" element={<InvoiceGeneration/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
