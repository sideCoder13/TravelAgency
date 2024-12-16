import Homepage from "./page/homepage"
import Details from "./page/detail"
import Navbar from "./componenets/Navbar";
import UserDetails from "./page/UserDetails";
import "./index.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="w-full h-full bg-gray-900">
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/details/:id" element={<Details/>} />
          <Route path="/submit" element={<UserDetails/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
