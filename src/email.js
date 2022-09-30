function sendAuthEmail(message) {
  var SibApiV3Sdk = require("sib-api-v3-sdk");

  var defaultClient = SibApiV3Sdk.ApiClient.instance;

  // Configure API key authorization: api-key
  var apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey =
    process.env.SENDINBLUE_API_KEY

  var api = new SibApiV3Sdk.AccountApi();
//   api.getAccount().then(
//     function (data) {
//       console.log(
//         "API called successfully. Returned data: " + JSON.stringify(data)
//       );
//     },
//     function (error) {
//       console.error(error);
//     }
//   );

  // Send Transactional Email
  const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

  const sender = {
    email: "forum2k.deptit.smit@gmail.com",
    name: "Forum2k SMIT",
  };
  const receivers = [
    {
      email: message,
    },
  ];

  tranEmailApi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject: "Auth SMIT EMail",
      textContent: `
        Cules Coding will teach you how to become {{params.role}} a developer.
        `,
      htmlContent: `
        <h1>Cules Coding</h1>
        {{params.message}}
                `,
      params: {
        role: "Frontend",
        message: message
      },
    })
    .then(console.log)
    .catch(console.log);
}
module.exports = { sendAuthEmail };
