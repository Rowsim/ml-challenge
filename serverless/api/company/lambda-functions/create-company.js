const aws = require("aws-sdk");

exports.createCompany = async (event) => {
  if (event.name) {
    aws.config.update({ region: "eu-west-2" });

    const params = {
      TableName: "ml-companies",
      Item: {
        id: event.id,
        name: event.name,
        createdDate: event.createdDate ? event.createdDate : +new Date(),
        contact: {},
      },
    };

    const docClient = new aws.DynamoDB.DocumentClient();
    const success = await docClient
      .put(params, function (err, data) {
        if (err) {
          return false;
        } else {
          return true;
        }
      })
      .promise();

    if (success) {
      return {
        statusCode: 200,
      };
    } else {
      return {
        statusCode: 400,
        body: "Error saving to db",
      };
    }
  }

  return {
    statusCode: 400,
    body: "Bad request",
  };
};
