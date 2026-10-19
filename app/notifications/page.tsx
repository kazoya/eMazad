import type { Metadata } from "next";
import { NotificationsScreen } from "@/components/notifications-screen";

export const metadata: Metadata = { title: "الإشعارات" };

export default function Page() {
  return <NotificationsScreen />;
}
