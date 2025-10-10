import { createContext, useState } from "react";

import type { ReactNode } from "react";


interface ProfileContextType {
  profileOpen: boolean;
  setProfileOpen: (open: boolean) => void;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <ProfileContext.Provider value={{ profileOpen, setProfileOpen }}>
      {children}
    </ProfileContext.Provider>
  );
};
