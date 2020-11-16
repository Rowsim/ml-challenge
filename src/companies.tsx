import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { AppContext } from "./AppContext";
import Fuse from "fuse.js";
import { ReactComponent as DeleteSvg } from "./assets/remove.svg";
import { Company, deleteCompany, getCompanies } from "./company-service";

export const Companies = () => {
  const { companies, setCompanies, searchTerm, selectedCompany } = useContext(
    AppContext
  );

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
                  <CompanyTile
                    key={result.item.id}
                    company={result.item}
                    selected={result.item.id === selectedCompany.id}
                  />
                );
              })
            : companies.map((company) => (
                <CompanyTile
                  key={company.id}
                  company={company}
                  selected={company.id === selectedCompany.id}
                />
              ))}
        </CompaniesStyled>
      )}
    </>
  );
};

const CompanyTile = ({
  company,
  selected,
}: {
  company: Company;
  selected?: boolean;
}) => {
  const createdDate = new Date(company.createdDate * 1000);
  const { companies, setCompanies, setSelectedCompany } = useContext(
    AppContext
  );

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
    <div className="company-tile-container">
      <div
        className={`company-tile ${selected ? "company-tile--selected" : ""}`}
        onClick={() => setSelectedCompany(company)}
      >
        <div className="company-tile__title">{company.name}</div>
        <div className="company-tile__details">
          <div className="company-tile__details__id">{company.id}</div>
          <div>{`${createdDate.getDate()}/${
            createdDate.getMonth() + 1
          }/${createdDate.getFullYear()}`}</div>
        </div>
        {company.contact && selected && (
          <div className="company-tile__contact">
            {company.contact.telephone && (
              <div>{company.contact.telephone}</div>
            )}
            {company.contact.email && <div>{company.contact.email}</div>}
            {company.contact.address && <div>{company.contact.address}</div>}
          </div>
        )}
      </div>
      <DeleteSvg
        className="delete-btn"
        onClick={() => handleDeleteCompany(company.id)}
      />
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

  .company-tile-container {
    position: relative;
    cursor: pointer;
  }

  .delete-btn {
    position: absolute;
    top: 3px;
    right: 0;
    height: 24px;
    fill: red;

    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 0.6;
    }

    @media only screen and (min-width: 425px) {
      right: 25px;
    }
  }

  .company-tile {
    display: flex;
    flex-direction: column;
    margin-bottom: 14px;
    border-left: 8px solid teal;
    border-bottom: 1px solid teal;
    border-radius: 3px 3px 0px 3px;
    padding: 0 2px;
    transition: background 0.5s ease;
    box-shadow: -2px 2px 3px rgba(0, 0, 0, 0.1);

    &--selected {
      background: rgba(0, 128, 128, 0.15);
    }

    &:hover {
      background: rgba(0, 128, 128, 0.1);
    }

    @media only screen and (min-width: 425px) {
      margin-right: 24px;
      min-width: 280px;
    }

    &__title {
      margin-bottom: 4px;
      color: teal;
      font-weight: bold;
      font-size: 24px;
    }

    &__details {
      font-size: 12px;
      font-style: italic;
      color: grey;
    }

    &__contact {
      margin: 12px 0 4px 0;
    }
  }
`;
