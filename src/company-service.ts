import { v4 as uuidv4 } from "uuid";

const AWS_URI = "https://hq7pn37pi9.execute-api.eu-west-2.amazonaws.com/prod";

export const getCompanies = async (): Promise<Company[]> => {
  const companies = await fetch(`${AWS_URI}/companies`);
  const companiesJson = companies.json();
  console.log(companiesJson);

  return companiesJson.then((result) => {
    if (result.statusCode === 200) {
      return JSON.parse(result.body);
    }
    return [];
  });
};

export const createCompany = async (
  name: string
): Promise<Company | boolean> => {
  const payload: Company = {
    id: uuidv4(),
    name,
    createdDate: +new Date(),
  };

  const response = await fetch(`${AWS_URI}/companies`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });

  const responseJson = await response.json();
  console.log(responseJson);
  if (responseJson.statusCode === 200) {
    return payload;
  }

  return false;
};

export const deleteCompany = async (id: string) => {
  const payload = {
    id,
  };

  const response = await fetch(`${AWS_URI}/companies`, {
    method: "DELETE",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });

  const responseJson = await response.json();
  console.log(responseJson);
  if (responseJson.statusCode === 200) {
    return true;
  }

  return false;
};

export const updateCompanyContact = async (
  id: string,
  updatedContact: Contact
): Promise<any> => {
  const payload = {
    id,
    contact: updatedContact,
  };

  const response = await fetch(`${AWS_URI}/companies`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });

  const responseJson = await response.json();
  console.log(responseJson);
  if (responseJson.statusCode === 200) {
    return payload;
  }

  return false;
};

export interface Company {
  id: string;
  name: string;
  createdDate: number;
  contact?: Contact;
}

export interface Contact {
  telephone?: string;
  email?: string;
  address?: string;
}
