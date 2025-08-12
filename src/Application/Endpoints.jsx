const baseURL = "http://192.168.1.5:8080";  //Use this for local development

const Endpoints = {
  getAllRoles: baseURL + "/roles/getRoles",
  getAllClasses: baseURL + "/classes/getAllClassesBySchool",
  loginUrl: baseURL + "/users/login",
  studentLoginUrl: baseURL + "/students/login",
  createStudent: baseURL + "/students/createStudent",
  getAllStudents: baseURL + "/students/getAllStudents",
  getAllUsers: baseURL + "/users/getAllUsers",
  getAllPendingFeesStudents: baseURL + "/students/pending-fees",
  createUser: baseURL + "/users/createUser",
  uploadStudentDocs: baseURL + "/docs",
  getStudentDocuments: baseURL + "/docs",
  studentDetails: baseURL + "/students/studentDetails",
  searchStudentFees: baseURL + "/fees/search",
  saveStudentPayment: baseURL + "/fees/pay",
  updateStudent: baseURL + "/students/updateStudent",
  addSubject: baseURL + "/subjects/createSubject",
  getAllSubjects: baseURL + "/subjects/all",
  getAllSubjectsByClassId: baseURL + "/subjects/by-class",
  getAllSubjectsBySchool: baseURL + "/subjects/by-school",
  schoolAllSubject: baseURL + "/subjects/schoolAllSubject",
  getAllStudentsByClassId: baseURL + "/students/stuDetailsByClass",
  submitMarks: baseURL + "/marksheets/createMarksheet",
  getAllDetailsByClass: baseURL + "/classes",
  getAllUsersByRole: baseURL + "/users/byRoleId",
  getSchoolUsers: baseURL + "/users/getSchoolUsers",
  getAttendanceByTeacher: baseURL + "/users/byUserId",
  submitTeacherAttendance: baseURL + "/attendance/markBulkAttendance",
  addTimeTable: baseURL + "/timetable/create",
  getTimeTableByClass: baseURL + "/timetable/class",
  getDashboardStats: baseURL + "/dashboard/stats",
  studentDetails: baseURL + "/students/studentDetails",
  studentMarksheet: baseURL + "/marksheets/evaluate/student",
  getAllSchools: baseURL + "/schools",
  schoolcreate: baseURL + "/schools/createSchool",
  AddClasses: baseURL + "/classes/createClass",


  // StudentMarksheet: baseURL+ "/marksheets/evaluate/1",
};

export default Endpoints;