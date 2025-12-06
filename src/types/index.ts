export type ActionType = "add" | "less" | "edit" | "delete" | "view";
export interface Debtor {
  id: number;
  name: string;
  current_balance: string;
  status: string;
  created_at: string;
  last_updated: string;
}
