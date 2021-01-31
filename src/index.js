var get_info = require("./pull.js");
var get_user = require("./verify.js");

(async () => {
  const user = await get_user("lucasace");
  console.log(user.status);
  // 200-> user exists
  // 404-> user doesnt exist
  console.log(await get_info("lucasace"));
})()

