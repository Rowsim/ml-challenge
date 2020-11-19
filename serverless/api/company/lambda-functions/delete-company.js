const aws = require("aws-sdk");

exports.deleteCompany = async (event) => {
  if (event.id) {
    const params = {
      TableName: "ml-companies",
      Key: {
        id: event.id,
      },
    };

    const docClient = new aws.DynamoDB.DocumentClient();
    const success = await docClient
      .delete(params, function (err, data) {
        if (err) {
          return false;
        } else {
          return true;
        }
      })
      .promise();

    if (success) {
      return { statusCode: 200 };
    } else return { statusCode: 400, body: `Failed to delete: ${event.id}` };
  }

  return { statusCode: 400, body: "Bad request" };
};
