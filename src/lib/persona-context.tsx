// src/lib/persona-context.tsx
"use client";

import { createContext, useContext } from "react";

export type Persona = "business" | "creator";

export const PersonaContext = createContext<Persona>("business");

export function usePersona() {
  return useContext(PersonaContext);
}
