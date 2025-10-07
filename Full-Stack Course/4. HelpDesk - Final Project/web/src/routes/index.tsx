import { BrowserRouter } from "react-router";

import { useAuth } from "../hooks/useAuth";

import { Loading } from "../components/Loading";

import { AuthRoutes } from "./AuthRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { ClientRoutes } from "./ClientRoutes";


export function Routes() {
  const { isLoading, session } = useAuth();

  function Route() {
    switch (session?.user.role) {
      case "client":
        return <ClientRoutes />
      case "technician":
        return "";
      case "admin":
        return <AdminRoutes />
      default:
        return <AuthRoutes />
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
