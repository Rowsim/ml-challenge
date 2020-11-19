const aws = require("aws-sdk");

exports.getCompanies = async (event) => {
  const params = { TableName: "ml-companies" };

  aws.config.update({ region: "eu-west-2" });
  const documentClient = new aws.DynamoDB.DocumentClient();

  const scanAll = async (params) => {
    let lastEvaluatedKey = "dummy"; // string must not be empty
    const itemsAll = [];
    while (lastEvaluatedKey) {
      const data = await documentClient.scan(params).promise();
      itemsAll.push(...data.Items);
      lastEvaluatedKey = data.LastEvaluatedKey;
      if (lastEvaluatedKey) {
        params.ExclusiveStartKey = lastEvaluatedKey;
      }
    }
    return itemsAll;
  };

  const allCompanies = await scanAll(params);

  const response = {
    statusCode: 200,
    body: JSON.stringify(allCompanies),
  };

  return response;
};
