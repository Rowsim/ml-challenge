"use strict";

const { createCompany } = require("./lambda-functions/create-company");
const { deleteCompany } = require("./lambda-functions/delete-company");
const { getCompanies } = require("./lambda-functions/get-companies");
const { updateCompany } = require("./lambda-functions/update-company");

const headers = {
  "Access-Control-Allow-Origin": "*",
};

module.exports.getCompanies = async (event) => {
  return { headers, ...(await getCompanies(event)) };
};

module.exports.addCompany = async (event) => {
  return { headers, ...(await createCompany(event)) };
};

module.exports.updateCompany = async (event) => {
  return { headers, ...(await updateCompany(event)) };
};

module.exports.deleteCompany = async (event) => {
  return { headers, ...(await deleteCompany(event)) };
};
