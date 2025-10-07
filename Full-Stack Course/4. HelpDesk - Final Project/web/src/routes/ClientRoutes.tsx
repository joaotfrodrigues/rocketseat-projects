import { Routes, Route } from "react-router";

import { DashboardLayout } from "../layouts/Dashboard";

import { Calls } from "../pages/Calls";
import { NotFound } from "../pages/NotFound";


export function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="/" element={<Calls />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
