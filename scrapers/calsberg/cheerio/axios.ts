import axios from "axios";
import https from "https";

export default axios.create({
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});
