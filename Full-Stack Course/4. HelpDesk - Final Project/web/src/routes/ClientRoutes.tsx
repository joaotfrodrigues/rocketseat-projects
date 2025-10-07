import { Routes, Route } from "react-router";

import { DashboardLayout } from "../layouts/Dashboard";

import { NotFound } from "../pages/NotFound";


export function ClientRoutes() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
