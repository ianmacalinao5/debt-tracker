export type ActionType = "add" | "less" | "edit" | "delete" | "view";
export type TransactionType = "add" | "less";

export interface Debtor {
    id: number;
    name: string;
    current_balance: number | string;
    status: "outstanding" | "cleared";
    created_at: string;
    updated_at: string;
}

export interface Transaction {
    id: number;
    debtor_id: number;
    type: "add" | "less";
    amount: number;
    balance_before: number;
    balance_after: number;
    created_at: string;
}

export interface FetchDebtorParams {
    page?: number;
    per_page?: number;
    filter?: "all" | "outstanding" | "cleared";
    search?: string;
}

export interface DebtorResponse {
    data: Debtor[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}
