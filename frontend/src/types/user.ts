import { Role } from "@/lib/authContext";

export interface UserProfile {
  uid: string;
  email: string;
  role: Role;
}
