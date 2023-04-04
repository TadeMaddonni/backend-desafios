import { config } from "https://deno.land/x/dotenv/mod.ts";

const { DATABASE_URL } = config();

console.log(DATABASE_URL);
// deno run --allow-read --allow-env .\objetoDeno.ts
