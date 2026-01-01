import type { JSX } from "react";
import { renderToString } from "react-dom/server";
import { About } from "../templates/about";
import { Contact } from "../templates/contact";
import { Home } from "../templates/home";

const render = (element: JSX.Element): Response =>
  new Response(renderToString(element), {
    headers: { "Content-Type": "text/html" },
  });

export const viewRoutes = {
  "/": () => render(<Home />),
  "/about": () => render(<About />),
  "/contact": () => render(<Contact />),
};
