export const getCompanies = async () => {
  const companies = await fetch(
    "https://hq7pn37pi9.execute-api.eu-west-2.amazonaws.com/prod/companies"
  );
  const companiesJson = companies.json();

  return companiesJson.then(result => {
      if (result.statusCode === 200) {
          return JSON.parse(result.body)
      }
      return []
  })
};
