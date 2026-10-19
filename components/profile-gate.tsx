"use client";

import { Guard } from "@/components/site";
import { ProfileScreen } from "@/components/profile-screen";

export function ProfileGate() {
  return <Guard><ProfileScreen /></Guard>;
}
