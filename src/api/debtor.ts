import api from "./axios";
import type {
    Debtor,
    Transaction,
    FetchDebtorParams,
    DebtorResponse,
} from "@/types";

export const fetchDebtors = (params: FetchDebtorParams) => {
    return api.get<DebtorResponse>("/debtors", {
        params: params,
    });
};

export const createDebtorRequest = (payload: {
    name: string;
    current_balance: number;
}) => {
    return api.post<Debtor>("/debtors", payload);
};

export const fetchDebtorRequest = (debtorId: number) => {
    return api.get<Debtor>(`/debtors/${debtorId}`);
};

export const updateDebtorRequest = (
    debtorId: number,
    payload: {
        name: string;
        current_balance: number;
    }
) => {
    return api.put<Debtor>(`/debtors/${debtorId}`, payload);
};

export const addDebtorAmountRequest = (
    debtorId: number,
    payload: { amount: number }
) => {
    return api.post<Debtor>(`/debtors/${debtorId}/add`, payload);
};

export const payDebtorAmountRequest = (
    debtorId: number,
    payload: { amount: number }
) => {
    return api.post<Debtor>(`/debtors/${debtorId}/pay`, payload);
};

export const deleteDebtorRequest = (debtorId: number) => {
    return api.delete(`/debtors/${debtorId}`);
};

export const fetchDebtorTransactionsRequest = (debtorId: number) => {
    return api.get<Transaction[]>(`/debtors/${debtorId}/transactions`);
};
