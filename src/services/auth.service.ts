import {store} from "../redux/store";
import isEmpty from "is-empty";
import {setAuthToken} from "./api";

class AuthService {
  login(){}

  signup(){}

  getUserDetails(){}

  async reAuthenticate(){
    try {
      const token = store.getState().auth?.token?.token;
      if (!isEmpty(token)) {
        setAuthToken(token);
        // await this.init();
      } else {
        this.logout();
      }
    } catch (e: any) {
      this.logout();
    }
  }

  logout(){}

}

const authService = new AuthService();
export default authService;
