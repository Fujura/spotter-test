import type { Route } from "../+types/root";

export async function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url);
	
	if (url.pathname.endsWith(".map") || url.pathname.endsWith(".js.map") || url.pathname.endsWith(".css.map")) {
		return new Response(null, { status: 404 });
	}

	throw new Response(null, { status: 404 });
}


