import './App.css';
import {BrowserRouter as Routers,Routes,Route} from "react-router-dom";
import Logify from './component/Logify';
import SchoolFrontPage from './component/SchoolFrontPage';
import SignUpPage from './component/SignUpPage';
import AdminUsers from './userPages/AdminUsers';
import TeachersUser from './userPages/TeachersUser';
import StudentPage from './userPages/StudentPage';
import ParentsUsers from './userPages/ParentsUsers';
import FeesPage from './userPages/FeesPage';
import TcPage from './userPages/TcPage';
import AddNewEmpPage from './userPages/AddNewEmpPage';
import TimeTablePage from './component/TimeTablePage';
function App() {
  return (
    <Routers>
      <Routes>
        <Route path='/' element={<SchoolFrontPage/>}></Route>
        <Route path='/logify' element={<Logify/>}></Route>
        <Route path='/signUp' element={<SignUpPage/>}></Route>
        <Route path='/studentUser' element={<StudentPage/>}></Route>
        <Route path='/adminUser' element={<AdminUsers/>}></Route>
        <Route path='/teachersUser' element={<TeachersUser/>}></Route>
        <Route path='/parentsusers' element={<ParentsUsers/>}></Route>
        <Route path="/fees" element={<FeesPage />} />
        <Route path='/tcPage' element={<TcPage/>}></Route>
        <Route path='/newEmployee' element={<AddNewEmpPage/>}></Route>
        <Route path='/timetable' element={<TimeTablePage/>}></Route>

      </Routes>
    </Routers>
  );
}

export default App;
