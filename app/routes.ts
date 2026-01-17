import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("pages/Home/home.tsx"),
	route("api/flights/search", "api/flights/search.ts"),
	route("api/airports/search", "api/airports/search.ts"),
	route("*", "routes/$.tsx"),
] satisfies RouteConfig;
