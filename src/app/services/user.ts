import axios from "axios";
import { BOT_SERVER } from ".";
import { IUser } from "../models/user";

const BASE_URL = BOT_SERVER + "/users/";

export async function getUser(number: string) {
  return axios.get<IUser>(BASE_URL + number);
}

export async function createUser(number: string, name: string) {
  return axios.post<IUser>(BASE_URL, {
    id: number,
    name,
    step: 0,
    token: null,
  });
}

export async function updateUserStep(number: string, step: number) {
  return axios.patch<IUser>(BASE_URL + number, { step });
}

export async function updateUserData(
  number: string,
  key: string,
  value: string | number
) {
  return axios.patch<IUser>(BASE_URL + number, { [key]: value });
}
