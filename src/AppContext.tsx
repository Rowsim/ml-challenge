import React, { createContext, useState } from "react";
import { Company } from "./company-service";

interface AppContextType {
  companies: Array<Company>;
  setCompanies: Function;
  searchTerm: string;
  setSearchTerm: Function;
  selectedCompany: Company;
  setSelectedCompany: Function;
}

export const AppContext = createContext<AppContextType>({
  companies: [],
  setCompanies: () => {},
  searchTerm: "",
  setSearchTerm: () => {},
  selectedCompany: {} as Company,
  setSelectedCompany: () => {},
});

export const AppProvider = ({ children }: any) => {
  const [companies, setCompanies] = useState([] as Company[]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState({} as Company);

  return (
    <AppContext.Provider
      value={{
        companies,
        setCompanies,
        searchTerm,
        setSearchTerm,
        selectedCompany,
        setSelectedCompany,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
