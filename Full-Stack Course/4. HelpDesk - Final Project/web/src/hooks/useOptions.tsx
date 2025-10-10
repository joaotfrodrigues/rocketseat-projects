import { use } from "react";

import { OptionsContext } from "../contexts/OptionsContext";


export function useOptions() {
  const context = use(OptionsContext);

  return context;
}
