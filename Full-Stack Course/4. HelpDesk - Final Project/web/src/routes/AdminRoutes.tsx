import { Routes, Route } from "react-router";

import { DashboardLayout } from "../layouts/Dashboard";

import { Calls } from "../pages/Calls";
import { Call } from "../pages/Call";
import { NotFound } from "../pages/NotFound";


export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />} >
        <Route path="/" element={<Calls />} />
        <Route path="/call/:id" element={<Call />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
