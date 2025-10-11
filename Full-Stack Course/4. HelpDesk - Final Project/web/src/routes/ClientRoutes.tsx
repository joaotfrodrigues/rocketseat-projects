import { Routes, Route } from "react-router";

import { DashboardLayout } from "../layouts/Dashboard";

import { Calls } from "../pages/Calls";
import { Call } from "../pages/Call";
import { CreateCall } from "../pages/CreateCall";

import { NotFound } from "../pages/NotFound";


export function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="/" element={<Calls />} />
        <Route path="/call/:id" element={<Call />} />
        <Route path="/call/create" element={<CreateCall />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
