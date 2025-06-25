import './App.css';
import {BrowserRouter as Routers,Routes,Route} from "react-router-dom";
import Logify from './component/Logify';
import SchoolFrontPage from './component/SchoolFrontPage';
import SignUpPage from './component/SignUpPage';
import StudentPanel from './panels/StudentPanel';
import AdminPanel from './panels/AdminPanel';
import TeacherPanel from './panels/TeacherPanel';

function App() {
  return (
    <Routers>
      <Routes>
        <Route path='/' element={<SchoolFrontPage/>}></Route>
        <Route path='/logify' element={<Logify/>}></Route>
        <Route path='/signUp' element={<SignUpPage/>}></Route>
        <Route path='/studentpanel' element={<StudentPanel/>}></Route>
        <Route path='/adminpanel' element={<AdminPanel/>}></Route>
        <Route path='/teacherpanel' element={<TeacherPanel/>}></Route>
      </Routes>
    </Routers>
  );
}

export default App;
