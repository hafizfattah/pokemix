import { Outlet } from "@remix-run/react";
// import type { LinksFunction } from "@remix-run/node";

export default function DetailIndex() {
  return (
    <div className="detail-page p-4 md:p-10">
        <Outlet/>
    </div>
  )
}
