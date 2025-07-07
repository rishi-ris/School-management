const baseURL = "http://192.168.10.12:8080"; // Use this for local development
const Endpoints = {
  getAllRoles: baseURL + "/roles/getRoles",
  getAllClasses: baseURL + "/classes/getAllClasses",
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
  addSubject: baseURL + "/subjects/add",
  getAllSubjects: baseURL + "/subjects/getAllSubjects",
};

export default Endpoints;
