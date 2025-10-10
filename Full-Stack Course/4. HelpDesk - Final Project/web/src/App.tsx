import { Routes } from "./routes";

import { AuthProvider } from "./contexts/AuthContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import { OptionsProvider } from "./contexts/OptionsContext";


export function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <OptionsProvider>
          <Routes />
        </OptionsProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}
