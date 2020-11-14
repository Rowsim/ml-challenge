import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { AppContext } from "./AppContext";
import { ReactComponent as DeleteSvg } from "./assets/remove.svg";

export const Companies = () => {
  const { companies } = useContext(AppContext);

  useEffect(() => {
    //getCompanies().then((results) => setCompanies(results));
  });

  return (
    <CompaniesStyled>
      {companies &&
        companies.map((company) => {
          const createdDate = new Date(company.createdDate * 1000);
          return (
            <div key={company.name} className="company-tile">
              <div className="company-tile__top">
                <div className="company-tile__title">{company.name}</div>
                <DeleteSvg onClick={() => alert("test..")}/>
              </div>
              <div className="company-tile__details">
                <div className="company-tile__details__id">{company.id}</div>
                <div>{`${createdDate.getDate()}/${createdDate.getMonth()}/${createdDate.getFullYear()}`}</div>
              </div>
            </div>
          );
        })}
    </CompaniesStyled>
  );
};

const CompaniesStyled = styled.div`
  width: 100%;

  @media only screen and (min-width: 425px) {
    width: 80%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .company-tile {
    display: flex;
    flex-direction: column;
    margin-bottom: 14px;
    border-left: 8px solid teal;
    border-bottom: 1px solid teal;
    border-radius: 3px 3px 0px 3px;
    padding: 0 2px;
    transition: background 0.5s;
    box-shadow: -2px 2px 3px rgba(0, 0, 0, 0.1);

    &:hover {
      background: rgba(0,0,0,0.1);
    }

    @media only screen and (min-width: 425px) {
      margin-right: 24px;
      min-width: 280px;
    }
  

    &__top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;

      svg {
        height: 24px;
        fill: red;
        cursor: pointer;

        &:hover {
          opacity: 0.8;
        }
        &:active {
          opacity: 0.6;
        }
      }
    }

    &__title {
      color: teal;
      font-weight: bold;
      font-size: 24px;
    }

    &__details {
      font-size: 12px;
      color: grey;
      font-style: italic;

      &__id {
      }
    }
  }
`;
