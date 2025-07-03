const baseURL = "http://192.168.10.3:8080";

const Endpoints = {
 getAllRoles: baseURL+"/roles/getRoles",
 getAllClasses: baseURL+"/classes/getAllClasses",
  loginUrl: baseURL+"/users/login",
  studentLoginUrl: baseURL+"/students/login",
  createStudent: baseURL+"/students/createStudent",
  getAllStudents: baseURL+"/students/getAllStudents",
  getAllUsers: baseURL+"/users/getAllUsers",
};

export default Endpoints;
