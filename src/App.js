import './App.css';
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import Logify from './component/Logify';
import SchoolFrontPage from './component/SchoolFrontPage';
import SignUpPage from './component/SignUpPage';
import AdminUsers from './userPages/AdminUsers';
import TeachersUser from './userPages/TeachersUser';
import StudentPage from './userPages/StudentPage';
import ParentsUsers from './userPages/ParentsUsers';
import FeesPage from './userPages/FeesPage';

function App() {
  return (
    <Routers>
      <Routes>
        <Route path='/' element={<SchoolFrontPage />} />
        <Route path='/logify' element={<Logify />} />
        <Route path='/signUp' element={<SignUpPage />} />
        <Route path='/StudentPage' element={<StudentPage />} />
        <Route path='/adminUser' element={<AdminUsers />} />
        {/* <Route path='/teachersUser' element={<TeachersUser />} /> */}
        {/* <Route path='/parentsusers' element={<ParentsUsers />} /> */}
        <Route path="/fees" element={<FeesPage />} />
      </Routes>
    </Routers>
  );
}

export default App;
