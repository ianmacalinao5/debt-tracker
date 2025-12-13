import api from "./axios";
import type { Debtor } from "@/types";

export const fetchDebtors = (
    status: "all" | "outstanding" | "cleared" = "all"
) => {
    return api.get<Debtor[]>("/debtors", {
        params: { status },
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
        status: "outstanding" | "cleared";
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
