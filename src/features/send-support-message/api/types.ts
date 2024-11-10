import { User } from "@/entities/user";

export type TParamTypes = {
  userInfo: User;
  message: string;
  type: 'problems' | 'ideas';
  locale: string;
};