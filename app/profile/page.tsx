import type { Metadata } from "next";
import { ProfileGate } from "@/components/profile-gate";

export const metadata: Metadata = { title: "حسابي" };

export default function Page() {
  return <ProfileGate />;
}
