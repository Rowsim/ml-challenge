"use strict";

const { createCompany } = require("./lambda-functions/create-company");
const { deleteCompany } = require("./lambda-functions/delete-company");
const { getCompanies } = require("./lambda-functions/get-companies");
const { updateCompany } = require("./lambda-functions/update-company");

module.exports.getCompanies = async (event) => {
  return await getCompanies(event);
};

module.exports.addCompany = async (event) => {
  return await createCompany(event);
};

module.exports.updateCompany = async (event) => {
  return await updateCompany(event);
};

module.exports.deleteCompany = async (event) => {
  return await deleteCompany(event);
};
