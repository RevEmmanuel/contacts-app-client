import {IContact} from "../types/contact";
import apiInstance from "./api";
import {AxiosResponse} from "axios";

class ContactService {
  createContact(data: IContact): Promise<IContact> {
    return new Promise((resolve, reject) => {
      apiInstance.post("/contact/create", data)
        .then((res: AxiosResponse<IContact>) => {
          resolve(res.data)
        })
        .catch(err => reject(err))
    });
  }

  updateContact(data: IContact): Promise<IContact> {
    return new Promise((resolve, reject) => {
      apiInstance.put(`/contact/${data.id}`, data)
        .then((res: AxiosResponse<IContact>) => {
          resolve(res.data)
        })
        .catch(err => reject(err))
    });
  }

  getContact(id: number): Promise<IContact> {
    return new Promise((resolve, reject) => {
      apiInstance.post(`/contact/${id}`)
        .then((res: AxiosResponse<IContact>) => {
          resolve(res.data)
        })
        .catch(err => reject(err))
    });
  }

  getAllContact(): Promise<{ count: number, rows: IContact[] }> {
    return new Promise((resolve, reject) => {
      apiInstance.post(`/contact/all`)
        .then((res: AxiosResponse<{ count: number, rows: IContact[] }>) => {
          resolve(res.data)
        })
        .catch(err => reject(err))
    });
  }

  deleteContact(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (window.confirm("Are you sure you want to delete?")) {
        apiInstance.delete(`/contact/${id}`)
          .then((res) => {
            resolve(true)
          })
          .catch(err => reject(err))
      } else {
        resolve(false);
      }
    });
  }
}

const contactService = new ContactService();
export default contactService;
