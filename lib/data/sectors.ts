import {
  Activity,
  Anchor,
  BatteryCharging,
  Boxes,
  Briefcase,
  Building,
  Building2,
  Car,
  CircuitBoard,
  Cpu,
  Dna,
  Factory,
  Film,
  FlaskConical,
  Footprints,
  Fuel,
  Gem,
  Gift,
  GraduationCap,
  Hammer,
  HeartPulse,
  Hotel,
  Landmark,
  Layers,
  Leaf,
  Microscope,
  Monitor,
  Package,
  Pickaxe,
  Pill,
  Plane,
  Radio,
  Route,
  Shield,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Store,
  TramFront,
  TrendingUp,
  Tv,
  UtensilsCrossed,
  Wheat,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

export interface Sector {
  /** Key under SectorsUnderOneRoofSection.sectors in messages/en.json */
  key: string;
  icon: LucideIcon;
  color: string;
}

/** The first ten are featured in the carousels; all of them scroll in the marquee rows. */
export const SECTORS: Sector[] = [
  { key: "Textiles", icon: Shirt, color: "#FB7185" },
  { key: "Footwear", icon: Footprints, color: "#F59E0B" },
  { key: "ToysGifts", icon: Gift, color: "#A78BFA" },
  { key: "RealEstate", icon: Building2, color: "#38BDF8" },
  { key: "HardwareTools", icon: Hammer, color: "#94A3B8" },
  { key: "EngineeringManufacturing", icon: Factory, color: "#FB923C" },
  { key: "GreenEnergy", icon: Leaf, color: "#4ADE80" },
  { key: "AutoEV", icon: Car, color: "#22D3EE" },
  { key: "FMCG", icon: ShoppingBag, color: "#FF9933" },
  { key: "ITElectronics", icon: Cpu, color: "#60A5FA" },
  { key: "Agriculture", icon: Wheat, color: "#84CC16" },
  { key: "AutoComponents", icon: Wrench, color: "#94A3B8" },
  { key: "Automobiles", icon: Car, color: "#F59E0B" },
  { key: "Aviation", icon: Plane, color: "#38BDF8" },
  { key: "Banking", icon: Landmark, color: "#60A5FA" },
  { key: "Biotechnology", icon: Dna, color: "#A78BFA" },
  { key: "Cement", icon: Layers, color: "#78716C" },
  { key: "Chemicals", icon: FlaskConical, color: "#34D399" },
  { key: "ConsumerDurables", icon: Tv, color: "#F472B6" },
  { key: "DefenceManufacturing", icon: Shield, color: "#6366F1" },
  { key: "EducationTraining", icon: GraduationCap, color: "#FB923C" },
  { key: "ElectricVehicle", icon: BatteryCharging, color: "#22D3EE" },
  { key: "ESDM", icon: CircuitBoard, color: "#60A5FA" },
  { key: "FinancialServices", icon: TrendingUp, color: "#34D399" },
  { key: "FoodProcessing", icon: UtensilsCrossed, color: "#FB7185" },
  { key: "GemsJewellery", icon: Gem, color: "#F59E0B" },
  { key: "Healthcare", icon: HeartPulse, color: "#FB7185" },
  { key: "Infrastructure", icon: Building, color: "#94A3B8" },
  { key: "Insurance", icon: ShieldCheck, color: "#60A5FA" },
  { key: "ITBPM", icon: Monitor, color: "#38BDF8" },
  { key: "Manufacturing", icon: Factory, color: "#FB923C" },
  { key: "MediaEntertainment", icon: Film, color: "#A78BFA" },
  { key: "MedicalDevices", icon: Activity, color: "#FB7185" },
  { key: "MetalsMining", icon: Pickaxe, color: "#94A3B8" },
  { key: "MSME", icon: Store, color: "#FF9933" },
  { key: "OilGas", icon: Fuel, color: "#F59E0B" },
  { key: "PaperPackaging", icon: Package, color: "#84CC16" },
  { key: "Pharmaceuticals", icon: Pill, color: "#34D399" },
  { key: "Ports", icon: Anchor, color: "#38BDF8" },
  { key: "Power", icon: Zap, color: "#FBBF24" },
  { key: "Railways", icon: TramFront, color: "#94A3B8" },
  { key: "Retail", icon: ShoppingCart, color: "#FF9933" },
  { key: "Roads", icon: Route, color: "#78716C" },
  { key: "ScienceTechnology", icon: Microscope, color: "#A78BFA" },
  { key: "Services", icon: Briefcase, color: "#60A5FA" },
  { key: "Steel", icon: Boxes, color: "#94A3B8" },
  { key: "Telecommunication", icon: Radio, color: "#38BDF8" },
  { key: "TourismHospitality", icon: Hotel, color: "#FB923C" },
];

const BY_KEY = new Map(SECTORS.map((sector) => [sector.key, sector]));

/** Resolve sectors from serialisable keys (icons are components, so they can't cross the server/client boundary). */
export function sectorsFromKeys(keys: string[]): Sector[] {
  return keys.flatMap((key) => {
    const sector = BY_KEY.get(key);
    return sector ? [sector] : [];
  });
}

const half = Math.ceil(SECTORS.length / 2);
export const FEATURED_KEYS = SECTORS.slice(0, 10).map((s) => s.key);
export const MARQUEE_ROW_ONE_KEYS = SECTORS.slice(0, half).map((s) => s.key);
export const MARQUEE_ROW_TWO_KEYS = SECTORS.slice(half).map((s) => s.key);
