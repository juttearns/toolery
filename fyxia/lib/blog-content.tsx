import { ComponentType } from "react";
import HowZakatIsCalculated from "@/components/blog/how-zakat-is-calculated-in-pakistan";
import HowEmiIsCalculated from "@/components/blog/how-emi-is-calculated";
import BmiExplained from "@/components/blog/bmi-explained";
import PakistanIncomeTaxSlabs from "@/components/blog/pakistan-income-tax-slabs-fy-2026-27";

export const blogContent: Record<string, ComponentType> = {
  "how-zakat-is-calculated-in-pakistan": HowZakatIsCalculated,
  "how-emi-is-calculated": HowEmiIsCalculated,
  "bmi-explained": BmiExplained,
  "pakistan-income-tax-slabs-fy-2026-27": PakistanIncomeTaxSlabs,
};
