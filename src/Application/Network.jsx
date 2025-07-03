// import axios from "axios";

import axios from "axios";
import Endpoints from "./Endpoints";

export default class Network {
  // 👤 Admin/Teacher Login
  static async login(username, password) {
    try {
      const response = await axios.post(
        Endpoints.loginUrl,
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      return response;
    } catch (error) {
      console.error("⚠️ User login error:", error);
      throw error;
    }
  }

  // 🎓 Student Login
  static async studentLogin(username, password) {
    try {
      const response = await axios.post(
        Endpoints.studentLoginUrl,
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      return response;
    } catch (error) {
      console.error("⚠️ Student login error:", error);
      throw error;
    }
  }
  //create student
  static async createStudent(studentData) {
    try {
      const response = await axios.post(
        Endpoints.createStudent,
        studentData,
        { headers: { "Content-Type": "application/json" } }
      );
      return response;
    } catch (error) {
      console.error("⚠️ Create student error:", error);
      throw error;
    }
  }

 //get All Students
  static async getAllStudents() {
    try {
      const response = await axios.get(
        Endpoints.getAllStudents,
        { headers: { "Content-Type": "application/json" } }
      );
      
      return response;
    } catch (error) {
      console.error("⚠️ Student login error:", error);
      throw error;
    }
  }






  static async login(username, password) {
    try {
      const response = await axios.post(
        Endpoints.loginUrl,
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      return response;
    } catch (error) {
      console.error("⚠️ User login error:", error);
      throw error;
    }
  }


  //get All roles
   static async getAllRoles() {
    try {
      const response = await axios.get(
        Endpoints.getAllRoles,
       
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("***RESPONSE***", response)
      return response;
    } catch (error) {
      console.error("⚠️ Student login error:", error);
      throw error;
    }
  }

 //get All classes
   static async getAllClasses() {
    try {
      const response = await axios.get(
        Endpoints.getAllClasses,
        { headers: { "Content-Type": "application/json" } }
      );

      return response;
    } catch (error) {
      console.error("⚠️ Student login error:", error);
      throw error;
    }
  }


}
