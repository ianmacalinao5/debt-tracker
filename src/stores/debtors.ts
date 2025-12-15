import { defineStore } from "pinia";
import type { Debtor, Transaction } from "@/types";
import {
    fetchDebtors,
    fetchDebtorTransactionsRequest,
    createDebtorRequest,
    updateDebtorRequest,
    addDebtorAmountRequest,
    payDebtorAmountRequest,
    deleteDebtorRequest,
} from "@/api/debtor";

export const useDebtorStore = defineStore("debtors", {
    state: () => ({
        debtors: [] as Debtor[],
        transactions: [] as Transaction[],
        loading: true,
        transactionsLoading: false,

        searchQuery: "",
        filter: "all" as "all" | "outstanding" | "cleared",
    }),

    getters: {
        totalDebtors: (state) => state.debtors.length,

        totalOutstanding: (state) => {
            const total = state.debtors.reduce(
                (sum, d) => sum + Number(d.current_balance),
                0
            );

            return total.toLocaleString("en-PH", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        },

        filteredDebtors: (state) => {
            return state.debtors.filter((d) => {
                const matchesSearch =
                    !state.searchQuery ||
                    d.name
                        .toLowerCase()
                        .includes(state.searchQuery.toLowerCase());

                const matchesFilter =
                    state.filter === "all" || d.status === state.filter;

                return matchesSearch && matchesFilter;
            });
        },

        hasDebtors: (state) => state.debtors.length > 0,

        emptyState(): "empty" | "search" | "filter" {
            if (!this.hasDebtors) return "empty";
            if (this.searchQuery && this.filteredDebtors.length === 0)
                return "search";
            if (this.filter !== "all" && this.filteredDebtors.length === 0)
                return "filter";

            return "empty";
        },
    },

    actions: {
        async loadDebtors() {
            this.loading = true;
            try {
                const res = await fetchDebtors(this.filter);
                this.debtors = res.data;
            } finally {
                this.loading = false;
            }
        },

        async loadTransactions(debtorId: number) {
            this.clearTransactions();
            this.transactionsLoading = true;
            try {
                const res = await fetchDebtorTransactionsRequest(debtorId);
                this.transactions = res.data;
            } finally {
                this.transactionsLoading = false;
            }
        },

        async createDebtor(payload: { name: string; current_balance: number }) {
            const res = await createDebtorRequest(payload);
            this.debtors.unshift(res.data);
            return res.data;
        },

        async updateDebtor(
            debtorId: number,
            payload: {
                name: string;
                status: "outstanding" | "cleared";
            }
        ) {
            const res = await updateDebtorRequest(debtorId, payload);
            this.debtors = this.debtors.map((d) =>
                d.id === debtorId ? res.data : d
            );
        },

        async addAmount(debtorId: number, amount: number) {
            const res = await addDebtorAmountRequest(debtorId, { amount });
            this.debtors = this.debtors.map((d) =>
                d.id === debtorId ? res.data : d
            );
            await this.loadTransactions(debtorId);
        },

        async payAmount(debtorId: number, amount: number) {
            const res = await payDebtorAmountRequest(debtorId, { amount });
            this.debtors = this.debtors.map((d) =>
                d.id === debtorId ? res.data : d
            );
            await this.loadTransactions(debtorId);
        },

        async deleteDebtor(debtorId: number) {
            await deleteDebtorRequest(debtorId);
            this.debtors = this.debtors.filter((d) => d.id !== debtorId);
        },

        clearTransactions() {
            this.transactions = [];
        },
    },
});
