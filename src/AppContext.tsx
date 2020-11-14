import React, { createContext, useState } from "react";
import { Company } from "./company-service";

interface AppContextType {
  companies: Array<Company>;
  setCompanies: Function;
}

export const AppContext = createContext<AppContextType>({
  companies: [],
  setCompanies: () => {},
});

export const AppProvider = ({ children }: any) => {
  const [companies, setCompanies] = useState([
    {
      name: "Apple",
      id: "e2b7e93a-1e3c-4a5a-8414-1c59f32b5b9c",
      createdDate: 1605313623,
    },
    {
      name: "Alphabet",
      id: "45e7b6dd-f568-4024-8d72-28bbe07c980d",
      createdDate: 1605312709,
    },
    {
      name: "Facebook",
      id: "cf393014-1e0a-47a3-b5c2-a86ea798ce27",
      createdDate: 1605312906,
    },
  ] as Company[]);

  return (
    <AppContext.Provider
      value={{
        companies,
        setCompanies,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
