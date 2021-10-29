require("dotenv").config();
const PORT = process.env.PORT || 5000;

const server = require("./api/server.js");

server.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
