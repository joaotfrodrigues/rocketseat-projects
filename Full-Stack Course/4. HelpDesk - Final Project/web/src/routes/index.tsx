import { BrowserRouter } from "react-router";

import { useAuth } from "../hooks/useAuth";

import { Loading } from "../components/Loading";

import { AuthRoutes } from "./AuthRoutes";


export function Routes() {
  const { isLoading, session } = useAuth();

  function Route() {
    switch (session?.user.role) {
      case "client":
        return "";
      case "technician":
        return "";
      case "admin":
        return "";
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
