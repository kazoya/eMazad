import {
  Bird, Building2, Car, Coins, Construction, Gem, House, Landmark, Map, Package, PawPrint,
  RectangleHorizontal, Smartphone, Store, Watch, type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Bird, Building2, Car, Coins, Construction, Gem, Home: House, Landmark, Map, Package, PawPrint,
  RectangleHorizontal, Smartphone, Store, Watch,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const C = icons[name] ?? Package;
  return <C className={className} aria-hidden />;
}
