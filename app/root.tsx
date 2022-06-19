import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from './tailwind.css';
import globalStyles from '~/styles/global.css';


export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}, {rel: 'stylesheet', href: globalStyles}];
  
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Pokemix | Pokemon Search with Remix", 
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="pokemix">
        <div className="container mt-12 mx-auto">
          <div className="flex justify-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png" alt="pokemon logo" width="300px" className="w-[300px]" />
          </div>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </div>
      </body>
    </html>
  );
}
