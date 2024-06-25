import axios from "axios";
import { SAQ_SERVER } from ".";
import { IFiscalNote, ITokenCompany } from "../models/company";
import { IUser } from "../models/user";

export async function getCompanyInfoByCellphone(phone: string) {
  return axios.get<ITokenCompany[]>(
    `${SAQ_SERVER}/log/get-company-info-by-cellphone/?phone=${phone}`
  );
}

export async function getCompanyInfoByCnpj(cnpj: string) {
  return axios.get<ITokenCompany>(
    `${SAQ_SERVER}/log/get-company-info-by-cnpj/?cnpj=${cnpj}`
  );
}

export function tokenCompanyInfoSanitazer(data: ITokenCompany[]) {
  return data.map((item) => {
    return {
      token: item.token,
      id: item.company.id,
      name: item.company.name,
      cnpj: item.company.cnpj,
    };
  });
}

export function getInvoiceByNumber(user: IUser, number: string) {
  const headers = {
    Authorization: `token ${user.token}`,
  };
  return axios.get<IFiscalNote>(
    `${SAQ_SERVER}/log/get-invoice-by-number/?number=${number}`,
    {
      headers,
    }
  );
}
