import axios from "axios";
require("dotenv").config();

const port = process.env.PORT_JSONSERVER || 3006;

export default axios.create({
  baseURL: "http://localhost:" + port,
});
