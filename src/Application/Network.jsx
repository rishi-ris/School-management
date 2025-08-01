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
      const response = await axios.post(Endpoints.createStudent, studentData, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error) {
      console.error("⚠️ Create student error:", error);
      throw error;
    }
  }
  //update student
  static async updateStudent(studentData) {
    try {
      const response = await axios.put(
        `${Endpoints.updateStudent}/${studentData.studentPin}`,
        studentData,
        { headers: { "Content-Type": "application/json" } }
      );
      return response;
    } catch (error) {
      console.error("⚠️ Update student error:", error);
      throw error;
    }
  }
  //get All Students
  static async getAllStudents() {
    try {
      const response = await axios.get(Endpoints.getAllStudents, {
        headers: { "Content-Type": "application/json" },
      });

      return response;
    } catch (error) {
      console.error("⚠️ Student error:", error);
      throw error;
    }
  }

  //get All Students
  static async getAllPendingFeesStudents() {
    try {
      const response = await axios.get(Endpoints.getAllPendingFeesStudents, {
        headers: { "Content-Type": "application/json" },
      });

      return response;
    } catch (error) {
      console.error("⚠️ Student error:", error);
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

  //get All roles
  static async getAllRoles() {
    try {
      const response = await axios.get(
        Endpoints.getAllRoles,

        { headers: { "Content-Type": "application/json" } }
      );
      console.log("***RESPONSE***", response);
      return response;
    } catch (error) {
      console.error("⚠️ Student error:", error);
      throw error;
    }
  }

  //get All classes
  static async getAllClasses() {
    try {
      const response = await axios.get(Endpoints.getAllClasses, {
        headers: { "Content-Type": "application/json" },
      });

      return response;
    } catch (error) {
      console.error("⚠️ Student error:", error);
      throw error;
    }
  }

  //create User
  static async addNewUser(userData) {
    try {
      const response = await axios.post(Endpoints.createUser, userData, {
        headers: { "Content-Type": "application/json" },
      });
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
          data: { studentId }, // Include studentId in the request body
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
    formData.append("file", file); // MUST match @RequestParam("file")
    formData.append("docType", docType); // Optional param

    try {
      const response = await axios.post(
        `${Endpoints.uploadStudentDocs}/${studentId}/upload`, // << fix: use actual studentId
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: false, // Or true, if backend requires cookies
        }
      );
      console.log("✅ Upload Success:", response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ Error uploading ${docType}:`, error);
      throw error;
    }
  }
  static async updateStudentDocument(studentId, docId, docType, file) {
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
  static async addSubject(subjectData) {
    try {
      const response = await axios.post(Endpoints.addSubject, subjectData, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error) {
      console.error("⚠️ Add subject error:", error);
      throw error;
    }
  }
  static async getAllSubjects() {
    try {
      const response = await axios.get(Endpoints.getAllSubjects, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error) {
      console.error("⚠️ Get all subjects error:", error);
      throw error;
    }
  }
  // static async StudentMarksheet() {
  //   try {
  //     const response = await axios.get(Endpoints.StudentMarksheet, {
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     return response;
  //   } catch (error) {
  //     console.error("Get all marksheet error:", error);
  //     throw error;
  //   }
  // }
  static async getAllStudentsByClassId(classId) {
    try {
      const response = await axios.get(
        `${Endpoints.getAllStudentsByClassId}/${classId}`,
        { headers: { "Content-Type": "application/json" } }
      );
      return response;
    } catch (error) {
      console.error("⚠️ Get students by class ID error:", error);
      throw error;
    }
  }
  static async getAllSubjectsByClassId(classId) {
    try {
      const response = await axios.get(
        `${Endpoints.getAllSubjectsByClassId}/${classId}`,
        { headers: { "Content-Type": "application/json" } }
      );
      return response;
    } catch (error) {
      console.error("⚠️ Get subjects by class ID error:", error);
      throw error;
    }
  }
  static async submitMarks(payload) {
    try {
      const response = await axios.post(`${Endpoints.submitMarks}`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error) {
      console.error("⚠️ Submit marks error:", error);
      throw error;
    }
  }
  static async getAllDetailsByClass(classId) {
    try {
      const response = await axios.get(
        `${Endpoints.getAllDetailsByClass}/${classId}/details`,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error("⚠️ Get all details by class error:", error);
      throw error;
    }
  }
  static async getAllUsersByRoleId(roleId) {
    try {
      const response = await axios.get(
        `${Endpoints.getAllUsersByRole}/${roleId}/with-attendance`,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error("⚠️ Get all users by role ID error:", error);
      throw error;
    }
  }
  static async submitTeacherAttendance(payload) {
    try {
      const response = await axios.post(
        Endpoints.submitTeacherAttendance,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      return response;
    } catch (error) {
      console.error("⚠️ Submit teacher attendance error:", error);
      throw error;
    }
  }
  static async addTimeTable(payload) {
    try {
      const response = await axios.post(Endpoints.addTimeTable, payload, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error) {
      console.error("⚠️ Add timetable error:", error);
      throw error;
    }
  }
  static async getTimeTableByClass(classId) {
    const today = new Date().toISOString().split("T")[0];
    try {
      const response = await axios.get(
        `${Endpoints.getTimeTableByClass}/${classId}?date=${today}`,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error("⚠️ Get timetable by class error:", error);
      throw error;
    }
  }
  static async getDashboardStats() {
    try {
      const response = await axios.get(Endpoints.getDashboardStats, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("⚠️ Get dashboard stats error:", error);
      throw error;
    }
  }

  static async getAttendanceByTeacher(teacherId) {
    try {
      const response = await axios.get(
        `${Endpoints.getAttendanceByTeacher}/${teacherId}/with-attendance`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {}
  }
  static async getStudentDetails(studentId) {
    try {
      const response = await axios.get(
        `${Endpoints.studentDetails}/${studentId}`,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error("⚠️ Error fetching student details", error);
      throw error;
    }
  }
   static async getStudentMarksheet(id) {
    try {
      const response = await axios.get(`${Endpoints.studentMarksheet}/${id}`, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching marksheet", error);
      throw error;
    }
  }
static async getAllSchools() {
  try {
    const response = await axios.get(Endpoints.getAllSchools, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching schools:", error);
    throw error;
  }
}
static async createSchool(data) {
    try {
      const response = await axios.post(
        Endpoints.schoolcreate,  // example: "/schools/createSchool"
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      console.error("⚠ Error creating school:", error);
      throw error;
    }
  }
}
