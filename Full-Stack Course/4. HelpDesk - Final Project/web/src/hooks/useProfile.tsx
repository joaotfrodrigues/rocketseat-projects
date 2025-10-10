import { use } from "react";

import { ProfileContext } from "../contexts/ProfileContext";


export function useProfile() {
  const context = use(ProfileContext);

  return context;
}
