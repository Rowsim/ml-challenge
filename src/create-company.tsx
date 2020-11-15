import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AppContext } from "./AppContext";
import { createCompany } from "./company-service";

export const CreateCompany = () => {
  const { companies, setCompanies } = useContext(AppContext);
  const [companyName, setCompanyName] = useState("");

  const createCompanyAndUpdateState = async () => {
    const createResult = await createCompany(companyName);
    if (createResult) {
      setCompanies([...companies, createResult]);
      setCompanyName("");
    }
  };

  return (
    <CreateCompanyStyled>
      <input
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.currentTarget.value)}
      />
      <div
        onClick={() => createCompanyAndUpdateState()}
        className="add-company-btn"
      >
        Add
      </div>
    </CreateCompanyStyled>
  );
};

const CreateCompanyStyled = styled.div`
  height: 100%;
  display: flex;
  width: 100%;
  box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.1);

  @media only screen and (min-width: 425px) {
    width: auto;
  }

  input {
    width: 100%;
    height: 100%;
    border-left: 1px solid rgba(0, 128, 128, 0.4);
    border-top: 1px solid rgba(0, 128, 128, 0.4);
    border-right: none;
    border-bottom: 1px solid rgba(0, 128, 128, 0.4);
    border-radius: 3px 0px 0px 3px;
  }

  .add-company-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 50px;
    background: teal;
    cursor: pointer;
    border-radius: 0px 3px 3px 0px;
    color: white;
    transition: opacity 0.3s;
    font-weight: bold;

    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 0.7;
      background: seagreen;
    }
  }
`;
