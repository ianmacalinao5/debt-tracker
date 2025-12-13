export type ActionType = "add" | "less" | "edit" | "delete" | "view";
export interface Debtor {
    id: number;
    name: string;
    current_balance: number | string;
    status: "outstanding" | "cleared";
    created_at: string;
    updated_at: string;
}
