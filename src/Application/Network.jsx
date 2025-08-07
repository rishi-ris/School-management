// Fixed version of the Network class with correct string interpolation and no syntax errors

import axios from "axios";
import Endpoints from "./Endpoints";

export default class Network {
  static async login(username, password) {
    try {
      const response = await axios.post(
        Endpoints.loginUrl,
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      return response;
    } catch (error) {
      console.error("⚠ User login error:", error);
      throw error;
    }
  }

  static async studentLogin(username, password) {
    try {
      const response = await axios.post(
        Endpoints.studentLoginUrl,
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      return response;
    } catch (error) {
      console.error("⚠ Student login error:", error);
      throw error;
    }
  }

  static async createStudent(studentData) {
    try {
      const response = await axios.post(Endpoints.createStudent, studentData, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error) {
      console.error("⚠ Create student error:", error);
      throw error;
    }
  }

  static async updateStudent(studentData) {
    try {
      const response = await axios.put(
        `${Endpoints.updateStudent}/${studentData.studentPin}`,
        studentData,
        { headers: { "Content-Type": "application/json" } }
      );
      return response;
    } catch (error) {
      console.error("⚠ Update student error:", error);
      throw error;
    }
  }

  static async getAllStudents() {
    try {
      const response = await axios.get(Endpoints.getAllStudents, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error) {
      console.error("⚠ Student error:", error);
      throw error;
    }
  }

  static async getAllPendingFeesStudents() {
    try {
      const response = await axios.get(Endpoints.getAllPendingFeesStudents, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error) {
      console.error("⚠ Student error:", error);
      throw error;
    }
  }

  static async getStudentDetails(studentId) {
    try {
      const response = await axios.get(
        `${Endpoints.studentDetails}/${studentId}`,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error("⚠ Error fetching student details", error);
      throw error;
    }
  }

  static async getAllRoles() {
    try {
      const response = await axios.get(Endpoints.getAllRoles, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error) {
      console.error("⚠ Roles error:", error);
      throw error;
    }
  }

  static async getAllClasses(schoolId) {
    try {
      const response = await axios.get(
        `${Endpoints.getAllClasses}/${schoolId}`,
        { headers: { "Content-Type": "application/json" } }
      );
      return response;
    } catch (error) {
      console.error("⚠ Classes error:", error);
      throw error;
    }
  }

  static async addNewUser(userData) {
    try {
      const response = await axios.post(Endpoints.createUser, userData, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error) {
      console.error("⚠ Create user error:", error);
      throw error;
    }
  }

  static async deleteStudentDocument(studentId, docId) {
    try {
      const response = await axios.delete(
        `${Endpoints.uploadStudentDocs}${studentId}/delete/${docId}`,
        {
          headers: { "Content-Type": "application/json" },
          data: { studentId },
        }
      );
      return response.data;
    } catch (error) {
      console.error("❌ Error deleting student document:", error);
      throw error;
    }
  }

  static async uploadStudentDocument(studentId, docType, file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("docType", docType);

    try {
      const response = await axios.post(
        `${Endpoints.uploadStudentDocs}/${studentId}/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
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

    try {
      const response = await axios.put(
        `${Endpoints.uploadStudentDocs}/updateDocument/${docId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getStudentDocuments(studentId) {
    try {
      const response = await axios.get(
        `${Endpoints.getStudentDocuments}/${studentId}/studentDocList`,
        { headers: { "Content-Type": "application/json" } }
      );
      return response;
    } catch (error) {
      console.error("⚠ Get student documents error:", error);
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
      console.error("⚠ Get student photos error:", error);
      throw error;
    }
  }

  static async searchStudentFees({ rollNumber, className }) {
    try {
      const response = await axios.get(Endpoints.searchStudentFees, {
        params: { className, rollNumber },
      });
      return response;
    } catch (error) {
      console.error("⚠ Search student fees error:", error);
      throw error;
    }
  }

  static async saveStudentPayment(paymentPayload) {
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
      console.error("⚠ Add subject error:", error);
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
      console.error("⚠ Get all subjects error:", error);
      throw error;
    }
  }

  static async getAllStudentsByClassId(classId) {
    try {
      const response = await axios.get(
        `${Endpoints.getAllStudentsByClassId}/${classId}`,
        { headers: { "Content-Type": "application/json" } }
      );
      return response;
    } catch (error) {
      console.error("⚠ Get students by class ID error:", error);
      throw error;
    }
  }

  static async getAllSubjectsByClassId(classId, schoolId) {
    try {
      const response = await axios.get(
        `${Endpoints.getAllSubjectsBySchool}/${schoolId}/class/${classId}`,
        { headers: { "Content-Type": "application/json" } }
      );
      return response;
    } catch (error) {
      console.error("⚠ Get subjects by class ID error:", error);
      throw error;
    }
  }

  static async schoolAllSubject(schoolId) {
    try {
      const response = await axios.get(
        `${Endpoints.schoolAllSubject}/${schoolId}`,
        { headers: { "Content-Type": "application/json" } }
      );
      return response;
    } catch (error) {
      console.error("⚠ Get all school subjects error:", error);
      throw error;
    }
  }

  static async submitMarks(payload) {
    try {
      const response = await axios.post(Endpoints.submitMarks, payload, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error) {
      console.error("⚠ Submit marks error:", error);
      throw error;
    }
  }

  static async getAllDetailsByClass(classId, schoolId) {
    try {
      const response = await axios.get(
        `${Endpoints.getAllDetailsByClass}/${classId}/details?schoolId=${schoolId}`,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error("⚠ Get all details by class error:", error);
      throw error;
    }
  }

  static async getAllUsersByRoleId(roleId, schoolId) {
    try {
      const response = await axios.get(
        `${Endpoints.getSchoolUsers}/${roleId}/schoolId/${schoolId}/with-attendance`,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error("⚠ Get all users by role ID error:", error);
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
      console.error("⚠ Submit teacher attendance error:", error);
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
      console.error("⚠ Add timetable error:", error);
      throw error;
    }
  }

  static async getTimeTableByClass(classId, schoolId, dayOfWeek) {
    try {
      const response = await axios.get(
        `${Endpoints.getTimeTableByClass}/${classId}`,
        {
          headers: { "Content-Type": "application/json" },
          params: { schoolId, dayOfWeek },
        }
      );
      return response.data;
    } catch (error) {
      console.error("⚠ Get timetable by class error:", error);
      throw error;
    }
  }

  static async getDashboardStats(schoolId) {
    try {
      const response = await axios.get(Endpoints.getDashboardStats, {
        headers: { "Content-Type": "application/json" },
        params: { schoolId },
      });
      return response.data;
    } catch (error) {
      console.error("⚠ Get dashboard stats error:", error);
      throw error;
    }
  }

  static async getAttendanceByTeacher(teacherId) {
    try {
      const response = await axios.get(
        `${Endpoints.getAttendanceByTeacher}/${teacherId}/with-attendance`,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error("⚠ Get attendance by teacher error:", error);
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

  static async getAllSchools(schoolId) {
    try {
      const response = await axios.get(`${Endpoints.getAllSchools}/${schoolId}`, {
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
      const response = await axios.post(Endpoints.schoolcreate, data, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("⚠ Error creating school:", error);
      throw error;
    }
  }

  static async AddClasses(schoolId) {
  try {
    const response = await axios.post(
      Endpoints.AddClasses,
      schoolId,
    
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error adding class:", error);
    throw error;
  }
}
}
