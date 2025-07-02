// import axios from "axios";
// import Endpoints from "./Endpoints";

// export default class Network {
//   static async login(username, password) {
//     try {
//       const request = {
//         username: username,
//         password: password,
//       };

//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//       const response = await axios.post(
//         Endpoints.loginUrl,
//         request, // ✅ यहाँ stringify हटाया गया है
//         config
//       );

//       return response;
//     } catch (error) {
//       console.error("⚠️ Login error:", error);
//       throw error;
//     }
//   }
// }


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
}
