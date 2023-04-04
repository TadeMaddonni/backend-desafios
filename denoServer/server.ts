import { serve } from "./depts.ts";

const handler = (req: Request) => {
	return new Response("Mi primer server Deno jaja", { status: 200 });
};

await serve(handler, {
	port: 8080,
});
