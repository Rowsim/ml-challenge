import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AppProvider } from "./AppContext";
import { Companies } from "./companies";

import { CreateCompany } from "./create-company";
import { SearchCompany } from "./search-company";

function App() {
  return (
    <AppProvider>
      <AppStyle>
        <h1>ML-Challenge</h1>
        <div className="top-controls">
          <CreateCompany />
          <SearchCompany />
        </div>
        <Companies />
      </AppStyle>
    </AppProvider>
  );
}

const AppStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .top-controls {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    font-size: 18px;

    div {
      height: 50px;
    }

    @media only screen and (min-width: 425px) {
      flex-direction: row;
      margin: 40px 0;
    }

    div:first-child {
      margin: 0 0 12px 0;

      @media only screen and (min-width: 425px) {
        margin: 0 12px 0 0;
      }
    }
  }
`;

export default App;
