const sdk = require("node-appwrite");
const MindsDB = require("mindsdb-js-sdk").default;
require("dotenv").config();
/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

// async function run() {
//   console.log("I am running! client");
//   const connection = await MindsDB.connect({
//     user: "webdripdev@gmail.com",
//     password: "Kunal@042002"
//   });

//   console.log("connected to mindsdb");
//   console.log("got appwrite credentials");

//   const answer = await MindsDB.SQL.runQuery(`
//     SELECT context, question, answer
//     FROM fitness_gpt4
//     WHERE context = 'Act like you are Arnold, my personal virtual trainer and nutritionist for Health and fitness. You give me advice and create workout plan, diet plan and help me with anything releated to fitness.'
//     AND question = 'diet plan for 100gms protien';
//   `);

//   console.log("answer is", answer);
// }

// run();

module.exports = async function (req, res) {
  const client = new sdk.Client();
  console.log("I am running! client");
  const connection = await MindsDB.connect({
    user: "webdripdev@gmail.com",
    password: "Kunal@042002"
  });

  console.log("connected to mindsdb");

  if (!req.variables["APPWRITE_FUNCTION_ENDPOINT"] || !req.variables["APPWRITE_FUNCTION_API_KEY"]) {
    console.warn("Environment variables are not set. Function cannot use Appwrite SDK.");
  } else {
    client
      .setEndpoint(req.variables["APPWRITE_FUNCTION_ENDPOINT"])
      .setProject(req.variables["APPWRITE_FUNCTION_PROJECT_ID"])
      .setKey(req.variables["APPWRITE_FUNCTION_API_KEY"])
      .setSelfSigned(true);
  }

  console.log("got appwrite credentials");

  const answer = await MindsDB.SQL.runQuery(`
    SELECT context, question, answer
    FROM fitness_gpt4
    WHERE context = 'Act like you are Arnold, my personal virtual trainer and nutritionist for Health and fitness. You give me advice and create workout plan, diet plan and help me with anything releated to fitness.'
    AND question = 'diet plan for 100gms protien';
  `);

  console.log("answer is", answer);

  res.json(answer);
};
