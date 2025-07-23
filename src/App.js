import "./App.css";
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";

// Component imports
import Logify from "./component/Logify";
import SchoolFrontPage from "./component/SchoolFrontPage";
import SignUpPage from "./component/SignUpPage";
import TimeTablePage from "./component/TimeTablePage";

// Admin/User Pages
import AdminUsers from "./userPages/AdminUsers";
import TeachersUser from "./userPages/TeachersUser";
import StudentPage from "./userPages/StudentPage";
import ParentsUsers from "./userPages/ParentsUsers";
import FeesPage from "./userPages/FeesPage";
import TcPage from "./userPages/TcPage";
import AddNewEmpPage from "./userPages/AddNewEmpPage";
import SubjectManager from "./userPages/SubjectManager";
import MarksEntryPage from "./userPages/MarksEntryPage";
import TeacherAttendancePage from "./userPages/TeacherAttendancePage";
import PaymentReceipt from "./userPages/PaymentReceipt";

// Student Pages
import StudentDashboard from "./StudentInformation/StudentDashboard";
import EnrollmentCard from "./StudentInformation/EnrollmentCard";
import StudentMarksheet from "./StudentInformation/StudentMarksheet";

// Teacher Dashboard Pages
import TeacherSubjectManager from "./teacherdetls/TeacherSubjectManager";
import TeacherDashboardside from "./teacherdetls/TeacherDasboardside";
import TeacherDasboardAttendance from "./teacherdetls/TeacherDasboardAttendance";
import TeacherDasboard from "./teacherdetls/TeacherDashboard";
import TeacherMarksEntry from "./teacherdetls/TeacherMarksEntry";
import { AuthProvider } from "./auth/AuthProvider";

function App() {
  return (
    <>
      <Routers>
         <AuthProvider>
        <Routes>
         
          <Route path="/" element={<SchoolFrontPage />} />
          <Route path="/logify" element={<Logify />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/studentUser" element={<StudentPage />} />
          <Route path="/adminUser" element={<AdminUsers />} />
          <Route path="/teachersUser" element={<TeachersUser />} />
          <Route path="/parentsusers" element={<ParentsUsers />} />
          <Route path="/fees" element={<FeesPage />} />
          {/* <Route path="/tcPage" element={<TcPage />} /> */}
          <Route path="/tcPage/:id" element={<TcPage />} />

          <Route path="/newEmployee" element={<AddNewEmpPage />} />
          <Route path="/timetable" element={<TimeTablePage />} />
          <Route path="/subjectManager" element={<SubjectManager />} />
          <Route path="/marksEntryPage" element={<MarksEntryPage />} />
          <Route path="/teacherAttendancePage" element={<TeacherAttendancePage />} />
          <Route path="/paymentReceipt" element={<PaymentReceipt />} />

          {/* Student Dashboard Routes */}
          <Route path="/studentinfo" element={<StudentDashboard />} />
          <Route path="/home" element={<EnrollmentCard />} />
          <Route path="/studentMarksheet" element={<StudentMarksheet />} />

          {/* Teacher Dashboard Routes */}
          <Route path="/TeacherDasboard" element={<TeacherDasboard />} />
          <Route path="/TeacherDasboardsike" element={<TeacherDashboardside />} />
          <Route path="/TeacherSubjectManager" element={<TeacherSubjectManager />} />
          <Route path="/teacherDasboradAttendance" element={<TeacherDasboardAttendance />} />
          <Route path="/teacherMarksEntryPage" element={<TeacherMarksEntry />} />
          {/* <Route path="/TeacherDasboardTimeTable" element ={<TeacherDasboardTimeTable/>}/> */}

          {/* Fallback Route */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
         
        </Routes>
         </AuthProvider>
      </Routers>
    </>
  );
}

export default App;
