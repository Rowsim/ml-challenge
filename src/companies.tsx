import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AppContext } from "./AppContext";
import Fuse from "fuse.js";
import { ReactComponent as DeleteSvg } from "./assets/remove.svg";
import { ReactComponent as EditSvg } from "./assets/edit.svg";
import { ReactComponent as CheckSvg } from "./assets/check.svg";

import {
  Company,
  deleteCompany,
  getCompanies,
  updateCompanyContact,
} from "./company-service";

export const Companies = () => {
  const { companies, setCompanies, searchTerm, selectedCompany } = useContext(
    AppContext
  );

  useEffect(() => {
    getCompanies().then((results) => {
      console.log(results);
      setCompanies(results);
    });
  }, [setCompanies]);

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
  const {
    companies,
    setCompanies,
    selectedCompany,
    setSelectedCompany,
  } = useContext(AppContext);
  const createdDate = new Date(company.createdDate);

  const [isEditing, setIsEditing] = useState(false);
  const [telephoneInput, setTelephoneInput] = useState(
    company.contact?.telephone
  );
  const [emailInput, setEmailInput] = useState(company.contact?.email);
  const [addressInput, setAddressInput] = useState(company.contact?.address);

  const handleDeleteCompany = async (id: string) => {
    const success = await deleteCompany(id);
    if (success) {
      const companiesFiltered = companies.filter(
        (company) => company.id !== id
      );
      setCompanies(companiesFiltered);
    }
  };

  const handleUpdateCompany = async () => {
    const updatedContact = {
      ...(telephoneInput && { telephone: telephoneInput }),
      ...(emailInput && { email: emailInput }),
      ...(addressInput && { address: addressInput }),
    };

    if (
      JSON.stringify(selectedCompany.contact) !== JSON.stringify(updatedContact)
    ) {
      const success = await updateCompanyContact(
        selectedCompany.id,
        updatedContact
      );

      if (success) {
        const updatedCompany = {
          ...selectedCompany,
          contact: updatedContact,
        };

        const companiesFiltered = companies.filter(
          (company) => company.id !== selectedCompany.id
        );
        setCompanies([updatedCompany, ...companiesFiltered]);
      }
    }

    setIsEditing(false);
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
        {selected && (
          <>
            <div className="company-tile__contact">
              {isEditing ? (
                <>
                  <input
                    placeholder="Telephone"
                    pattern="[0-9]*"
                    value={telephoneInput ? telephoneInput : ''}
                    onChange={(e) => {
                      const value = e.currentTarget.value;
                      if (value) {
                        setTelephoneInput(e.currentTarget.value);
                      } else {
                        setTelephoneInput(undefined);
                      }
                    }}
                  />

                  <input
                    placeholder="Email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.currentTarget.value)}
                  />

                  <input
                    placeholder="Address"
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.currentTarget.value)}
                  />
                </>
              ) : (
                <>
                  {company.contact && (
                    <>
                      {company.contact.telephone && (
                        <div>{company.contact.telephone}</div>
                      )}
                      {company.contact.email && (
                        <a href={`mailto:${company.contact.email}`}>
                          {company.contact.email.toLocaleLowerCase()}
                        </a>
                      )}
                      {company.contact.address && (
                        <div className="company-tile__contact__address">{company.contact.address}</div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
            {isEditing ? (
              <CheckSvg
                className="control-btn control-btn--save"
                onClick={() => handleUpdateCompany()}
              />
            ) : (
              <EditSvg
                className="control-btn control-btn--edit"
                onClick={() => {
                  setSelectedCompany(company);
                  setIsEditing(true);
                }}
              />
            )}
          </>
        )}
      </div>
      <DeleteSvg
        className="control-btn control-btn--delete"
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

  .control-btn {
    position: absolute;
    right: 2px;
    height: 24px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 0.6;
    }

    @media only screen and (min-width: 425px) {
      right: 27px;
    }

    &--delete {
      fill: red;
      top: 3px;
    }

    &--edit,
    &--save {
      fill: teal;
      height: 24px;
      top: unset;
      bottom: 6px;

      transition: fill 0.6s ease;

      &:hover,
      &:active {
        fill: #129612;
      }

      @media only screen and (min-width: 425px) {
        bottom: 20px;
      }
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
      cursor: initial;
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
      display: flex;
      flex-direction: column;
      max-width: 80%;
      margin: 12px 0 4px 0;
      font-size: 15px;
      color: #4c4b4b;

      input {
        font-size: inherit;
        color: #129612;

        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 1px solid teal;
      }

      &__address {
        font-style: italic;
      }
    }
  }
`;
