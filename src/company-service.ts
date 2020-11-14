export const getCompanies = async (): Promise<Company[]> => {
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

export interface Company {
  id: string,
  name: string,
  createdDate: number
}
