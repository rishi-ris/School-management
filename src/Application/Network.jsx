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

//get All Students
  static async getAllPendingFeesStudents() {
    try {
      const response = await axios.get(
        Endpoints.getAllPendingFeesStudents,
        { headers: { "Content-Type": "application/json" } }
      );
      
      return response;
    } catch (error) {
      console.error("⚠️ Student login error:", error);
      throw error;
    }
  }


  static async getStudentDetails(studentId) {
    try {
      const response = await axios.get(
        `${Endpoints.studentDetails}/${studentId}`,
        { headers: { "Content-Type": "application/json" } }
      );
      return response;
    } catch (error) {
      console.error("⚠️ Get student details error:", error);
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

  //create User
  static async addNewUser(userData) {
    try {
      const response = await axios.post(
        Endpoints.createUser,
        userData,
        { headers: { "Content-Type": "application/json" } }
      );
      return response;
    } catch (error) {
      console.error("⚠️ Create user error:", error);
      throw error;
    }
  }
  static async deleteStudentDocument(studentId, docId) {
    try {
      const response = await axios.delete(
        `${Endpoints.uploadStudentDocs}${studentId}/delete/${docId}`,
        {
          headers: { "Content-Type": "application/json" },
          data: { studentId } // Include studentId in the request body
        }
      );
      console.log("✅ Document deleted successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error deleting student document:", error);
      throw error;
    }
  }
static async uploadStudentDocument(studentId, docType, file) {
  console.log(`📂 Uploading ${docType} for student ${studentId}:`, file.name);
  const formData = new FormData();
  formData.append("file", file);         // MUST match @RequestParam("file")
  formData.append("docType", docType);   // Optional param

  try {
    const response = await axios.post(
      `${Endpoints.uploadStudentDocs}/${studentId}/upload`,  // << fix: use actual studentId
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: false // Or true, if backend requires cookies
      }
    );
    console.log("✅ Upload Success:", response.data);
    return response.data;
  } catch (error) {
    console.error(`❌ Error uploading ${docType}:`, error);
    throw error;
  }
}
static async updateStudentDocument (studentId, docId, docType, file)  {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("docType", docType);

    const response = await axios.put(
      `${Endpoints.uploadStudentDocs}/updateDocument/${docId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }


static async getStudentDocuments(studentId) {
  try {
    const response = await axios.get(
      `${Endpoints.getStudentDocuments}/${studentId}/studentDocList`,
      { headers: { "Content-Type": "application/json" } }
    );
    return response;
  } catch (error) {
    console.error("⚠️ Get student documents error:", error);
    throw error;
  }
}  
static async getStudentPhotos(studentId) {
  try {
    const response = await axios.get(
      `${Endpoints.getStudentPhotos}/${studentId}`,
      { headers: { "Content-Type": "application/json" } }
    );
    return response;
  } catch (error) {
    console.error("⚠️ Get student photos error:", error);
    throw error;
  }
}
static async searchStudentFees({ rollNumber, className }) {
  console.log("🔍 Searching fees for:", { rollNumber, className });
  try {
    const response = await axios.get(Endpoints.searchStudentFees, {
      params: { className, rollNumber },
    });
    return response;
  } catch (error) {
    console.error("⚠️ Search student fees error:", error);
    throw error;
  }
}
static async saveStudentPayment(paymentPayload) {
  console.log("💰 Saving student payment:", paymentPayload);
  try {
    const response = await axios.post(
      `${Endpoints.saveStudentPayment}/${paymentPayload.studentId}`,
      paymentPayload,
      { headers: { "Content-Type": "application/json" } }
    );
    return response;
  } catch (error) {
    console.error("❌ Error saving student payment:", error);
    throw error;
  }   
}
}



  

