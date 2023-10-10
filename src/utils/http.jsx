import axios from "axios";

import { BASE_API } from "./constant";

export default axios.create({
  baseURL: BASE_API,
});