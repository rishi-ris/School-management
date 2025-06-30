import axios from "axios";
import Endpoints from "./Endpoints";

export default class Network {
  static async login(username, password) {
    try {
      const request = {
        username: username,
        password: password,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        Endpoints.loginUrl,
        request, // ✅ यहाँ stringify हटाया गया है
        config
      );

      return response;
    } catch (error) {
      console.error("⚠️ Login error:", error);
      throw error;
    }
  }
}
