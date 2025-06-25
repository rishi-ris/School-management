import './App.css';
import {BrowserRouter as Routers,Routes,Route} from "react-router-dom";
import Logify from './component/Logify';
import SchoolFrontPage from './component/SchoolFrontPage';
import SignUpPage from './component/SignUpPage';
import AdminUsers from './userPages/AdminUsers';
import TeachersUser from './userPages/TeachersUser';
import StudentUsers from './userPages/StudentUsers';
import ParentsUsers from './userPages/ParentsUsers';

function App() {
  return (
    <Routers>
      <Routes>
        <Route path='/' element={<SchoolFrontPage/>}></Route>
        <Route path='/logify' element={<Logify/>}></Route>
        <Route path='/signUp' element={<SignUpPage/>}></Route>
        <Route path='/studentUsers' element={<StudentUsers/>}></Route>
        <Route path='/adminUser' element={<AdminUsers/>}></Route>
        <Route path='/teachersUser' element={<TeachersUser/>}></Route>
        <Route path='/parentsusers' element={<ParentsUsers/>}></Route>
      </Routes>
    </Routers>
  );
}

export default App;
