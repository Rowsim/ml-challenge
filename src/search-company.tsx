import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./AppContext";

export const SearchCompany = () => {
  const { setSearchTerm } = useContext(AppContext);

  return (
    <SearchCompanyStyled>
      <input
        onChange={(e) => setSearchTerm(e.currentTarget.value)}
        placeholder="Search for a company"
      />
    </SearchCompanyStyled>
  );
};

const SearchCompanyStyled = styled.div`
  height: 100%;
  width: 100%;

  @media only screen and (min-width: 425px) {
    width: auto;
  }

  input {
    height: 100%;
    width: 100%;
    border: 1px solid rgba(0, 128, 128, 0.4);
    box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    background: url(assets/search.svg) no-repeat content-box right center;

    &:focus {
      background: url(assets/search.svg) no-repeat content-box right center
        rgba(0, 0, 0, 0.01);
    }
  }
`;
