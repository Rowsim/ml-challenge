const aws = require("aws-sdk");

exports.updateCompany = async (event) => {
  if (event.id && event.contact) {
    aws.config.update({ region: "eu-west-2" });
    const { telephone, email, address } = event.contact;

    const params = {
      TableName: "ml-companies",
      Key: {
        id: event.id,
      },
      UpdateExpression:
        "set contact.telephone=:t, contact.email=:e, contact.address=:a, lastUpdated=:u",
      ExpressionAttributeValues: {
        ":t": telephone,
        ":e": email,
        ":a": address,
        ":u": +new Date(),
      },
      ReturnValues: "UPDATED_NEW",
    };

    const docClient = new aws.DynamoDB.DocumentClient();
    const success = await docClient
      .update(params, function (err, data) {
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
