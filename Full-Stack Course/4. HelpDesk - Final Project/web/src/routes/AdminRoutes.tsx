import { Routes, Route } from "react-router";

import { DashboardLayout } from "../layouts/Dashboard";

import { Calls } from "../pages/Calls";
import { Call } from "../pages/Call";
import { Technicians } from "../pages/Technicians";
import { ManageTechnician } from "../pages/ManageTechnician";

import { NotFound } from "../pages/NotFound";


export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />} >
        <Route path="/" element={<Calls />} />
        <Route path="/call/:id" element={<Call />} />
        <Route path="/technicians" element={<Technicians />} />
        <Route path="/technician/create" element={<ManageTechnician operation="create" />} />
        <Route path="/technician/update/:id" element={<ManageTechnician operation="update" />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
