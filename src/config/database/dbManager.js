import { getDbApi } from "../../DB/index.js";
import { DbConfig } from "../envConfig.js";

const managers = await getDbApi(DbConfig);
const { productContainer, userContainer } = await managers;

export { productContainer, userContainer };
