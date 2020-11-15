import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { AppContext } from "./AppContext";
import Fuse from "fuse.js";
import { ReactComponent as DeleteSvg } from "./assets/remove.svg";
import { Company, deleteCompany } from "./company-service";

export const Companies = () => {
  const { companies, searchTerm } = useContext(AppContext);

  useEffect(() => {
    //getCompanies().then((results) => setCompanies(results));
  });

  const fuseCompanies = new Fuse(companies, {
    keys: ["name"],
  });

  return (
    <>
      {companies && (
        <CompaniesStyled>
          {searchTerm
            ? fuseCompanies.search(searchTerm).map((result) => {
                return (
                  <CompanyTile key={result.item.name} company={result.item} />
                );
              })
            : companies.map((company) => (
                <CompanyTile key={company.name} company={company} />
              ))}
        </CompaniesStyled>
      )}
    </>
  );
};

const CompanyTile = ({ company }: { company: Company }) => {
  const createdDate = new Date(company.createdDate * 1000);
  const { companies, setCompanies } = useContext(AppContext);

  const handleDeleteCompany = async (id: string) => {
    const success = await deleteCompany(id);
    if (success) {
      const companiesFiltered = companies.filter(
        (company) => company.id !== id
      );
      setCompanies(companiesFiltered);
    }
  };

  return (
    <div className="company-tile">
      <div className="company-tile__top">
        <div className="company-tile__title">{company.name}</div>
        <DeleteSvg onClick={() => handleDeleteCompany(company.id)} />
      </div>
      <div className="company-tile__details">
        <div className="company-tile__details__id">{company.id}</div>
        <div>{`${createdDate.getDate()}/${
          createdDate.getMonth() + 1
        }/${createdDate.getFullYear()}`}</div>
      </div>
    </div>
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
      background: rgba(0, 0, 0, 0.1);
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
