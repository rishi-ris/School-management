import "./App.css";
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import Logify from "./component/Logify";
import SchoolFrontPage from "./component/SchoolFrontPage";
import SignUpPage from "./component/SignUpPage";
import AdminUsers from "./userPages/AdminUsers";
import FeesPage from "./userPages/FeesPage";
import StudentPage from "./userPages/StudentPage";
import TcPage from "./userPages/TcPage";
// import ParentsUsers from './userPages/ParentsUsers';
// import TeachersUser from './userPages/TeachersUser';

function App() {
  return (
    <Routers>
      <Routes>
        <Route path="/" element={<SchoolFrontPage />} />
        <Route path="/logify" element={<Logify />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/StudentPage" element={<StudentPage />} />
        <Route path="/adminUser" element={<AdminUsers />} />
        <Route path="/fees" element={<FeesPage />} />
        <Route path="/tcPage" element={<TcPage />} />
        {/* <Route path='/teachersUser' element={<TeachersUser />} /> */}
        {/* <Route path='/parentsusers' element={<ParentsUsers />} /> */}
      </Routes>
    </Routers>
  );
}

export default App;
