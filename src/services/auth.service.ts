import {store} from "../redux/store";
import isEmpty from "is-empty";
import apiInstance, {setAuthToken} from "./api";
import {ILogin, ISignup, IUser} from "../types/auth";
import {AxiosResponse} from "axios";
import {authActions} from "../redux/slices/authSlice";

class AuthService {
  login(data: ILogin): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      apiInstance.post("/auth/login", data)
        .then((res: AxiosResponse<{ token: string }>) => {
          const token = res.data.token
          store.dispatch(authActions.login(`Bearer ${token}`));
          setAuthToken(token);
          resolve(true);
        })
        .catch(err => reject(err));
    })
  }

  signup(data: ISignup): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      apiInstance.post("/auth/signup", data)
        .then((res: AxiosResponse<{
          createdUser: {
            token: string
          }
        }>) => {
          const token = res.data.createdUser.token
          store.dispatch(authActions.login(`Bearer ${token}`));
          setAuthToken(token);
          resolve(true);
        })
        .catch(err => reject(err));
    })
  }

  getUserDetails(): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      apiInstance.get("/auth/current-user")
        .then((res: AxiosResponse<IUser>) => {
          resolve(res.data);
        })
        .catch(err => reject(err));
    })
  }

  async reAuthenticate() {
    try {
      const token = store.getState().auth?.token;
      if (!isEmpty(token)) {
        setAuthToken(token);
      } else {
        this.logout();
      }
    } catch (e: any) {
      this.logout();
    }
  }

  logout() {
    setAuthToken();
    store.dispatch(authActions.logout());
  }

}

const authService = new AuthService();
export default authService;
