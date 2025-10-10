import { Routes, Route } from "react-router";

import { DashboardLayout } from "../layouts/Dashboard";

import { TechnicianCalls } from "../pages/TechnicianCalls";
import { Call } from "../pages/Call";

import { NotFound } from "../pages/NotFound";


export function TechnicianRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="/" element={<TechnicianCalls />} />
        <Route path="/call/:id" element={<Call />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
