import { format } from "https://deno.land/std@0.181.0/datetime/mod.ts";

const today: string = format(new Date(), "yyyy-MM-dd");
console.log(today);
