import { createContext, useState } from "react";

import type { ReactNode } from "react";


interface OptionsContextType {
  optionsOpen: boolean;
  setOptionsOpen: (open: boolean) => void;
}

export const OptionsContext = createContext<OptionsContextType | undefined>(undefined);

export const OptionsProvider = ({ children }: { children: ReactNode }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  return (
    <OptionsContext.Provider value={{ optionsOpen, setOptionsOpen }}>
      {children}
    </OptionsContext.Provider>
  );
};
