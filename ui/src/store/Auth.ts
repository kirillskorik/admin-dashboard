import { BASE_URL } from "./../config";
import { makeAutoObservable, runInAction, reaction } from "mobx";

import API from "../utils/api";
import { IFormInput } from "../components/Auth";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );
  }

  private _email = "";

  set email(value: string) {
    this._email = value;
  }

  get email() {
    return this._email;
  }

  private _password = "";

  set password(value: string) {
    this._password = value;
  }

  get password() {
    return this._password;
  }

  private _token = window.localStorage.getItem("jwt");

  get token() {
    return this._token;
  }

  set token(value) {
    this._token = value;
  }

  isLoading = false;

  private _error: string = "";

  get error(): string {
    return this._error;
  }

  set error(value: string) {
    this._error = value;
  }

  get isAuth() {
    return !!this._token;
  }

  auth(data: IFormInput, register: boolean) {
    this.isLoading = true;

    const url = register
      ? `${BASE_URL}/user/register`
      : `${BASE_URL}/user/login`;

    const axiosConfig = {
      url: url,
      method: "POST",
      data: {
        email: data.email,
        password: data.password,
      },
    };

    return API(axiosConfig)
      .then(({ response, err }) => {
        if (err) {
          console.log("err", err);
          this.error = err.data.message;
          throw err;
        }
        return response.data;
      })
      .then((data) => {
        runInAction(() => {
          this.token = data.accessToken;
        });
      })
      .catch(() => {
        runInAction(() => {
          this.password = "";
        });
        throw this.error;
      })
      .finally(() => {
        runInAction(() => {
          this.isLoading = false;
        });
      });
  }

  logout() {
    this.token = "";
  }
}

export default new AuthStore();
