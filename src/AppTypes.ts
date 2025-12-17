import { type User } from "firebase/auth";

export type AppUser = User & {
  pid: string;
  emailVerified: boolean;
};

export type Address = {
  Number: string;
  Street: string;
  City: string;
  Postcode: string;
};

export type UserProfile = {
  PID: string;
  First: string;
  Last: string;
  PreferredName: string;
};

export type PlanManager = {
  Name: string;
  Email: string;
  InvoicesEmail: string;
  Address: Address;
  Phone: string;
};

export type CustomerProfile = {
  PID: string;
  NDISNumber: string;
  PlanManager: PlanManager;
  Address: Address;
  Phone: string;
};

export type ProviderProfile = {
  PID: string;
  ABN: string;
  BusinessName: string;
  Address: Address;
  Phone: string;
};

export type Product = {
  Name: string;
  Code: string;
  MaxPrice: number;
};

export type Service = {
  Provider: ProviderProfile;
  Product: Product;
  Price: number;
};

export type Period = "Daily" | "Weekly" | "Monthly";

export type ServiceSchedule = {
  Service: Service;
  Units: number;
  Frequency: number;
  Period: Period;
  StartDate: Date;
  EndDate: Date;
};

export type TermsAndConditions = {
  Heading: string;
  Paragraph: string;
};

export type ServiceAgreement = {
  Customer: CustomerProfile;
  Provider: ProviderProfile;
  Date: Date;
  ServiceSchedule: ServiceSchedule[];
  TermsAndConditions: TermsAndConditions[];
  ProviderSignature: string;
  CustomerSignature: string;
  IsSent: boolean;
};
