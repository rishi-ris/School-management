const baseURL = "http://192.168.10.3:8080";

const Endpoints = {
 getAllRoles: baseURL+"/roles/getRoles",
 getAllClasses: baseURL+"/classes/getAllClasses",
  loginUrl: baseURL+"/users/login",
  studentLoginUrl: baseURL+"/students/login",
  createStudent: baseURL+"/students/createStudent",
  getAllStudents: baseURL+"/students/getAllStudents",
  getAllUsers: baseURL+"/users/getAllUsers",
  getAllPendingFeesStudents: baseURL+"/students/pending-fees",
  createUser: baseURL + "/users/createUser",
  uploadStudentDocs: baseURL + "/docs",
  studentDetails: baseURL + "/students/studentDetails",
};

export default Endpoints;
