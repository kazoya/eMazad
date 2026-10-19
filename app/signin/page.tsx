import type { Metadata } from "next";
import { SignInScreen } from "@/components/sign-in-screen";

export const metadata: Metadata = { title: "تسجيل الدخول" };

export default function Page() {
  return <SignInScreen />;
}
