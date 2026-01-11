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
        globalStats: {
            totalOutstanding: "0.00",
            totalCount: 0,
        },
        loading: true,
        transactionsLoading: false,
        isInitialLoading: true,

        page: 1,
        perPage: 10,
        total: 0,
        lastPage: 1,

        searchQuery: "",
        filter: "all" as "all" | "outstanding" | "cleared",
        searchTimeout: null as ReturnType<typeof setTimeout> | null,
    }),

    getters: {
        displayTotalCount: (state) => state.globalStats.totalCount,
        displayTotalAmount: (state) => state.globalStats.totalOutstanding,

        paginationMeta: (state) => ({
            current_page: state.page,
            last_page: state.lastPage,
        }),

        emptyState(): "empty" | "search" | "filter" {
            if (
                this.debtors.length === 0 &&
                !this.searchQuery &&
                this.filter === "all"
            )
                return "empty";
            if (this.searchQuery && this.debtors.length === 0) return "search";
            if (this.filter !== "all" && this.debtors.length === 0)
                return "filter";
            return "empty";
        },
    },

    actions: {
        async loadDebtors(params: { page?: number; perPage?: number } = {}) {
            this.loading = true;
            const page = params.page ?? 1;
            const perPage = params.perPage ?? this.perPage;

            try {
                const res = await fetchDebtors({
                    page,
                    per_page: perPage,
                    filter: this.filter,
                    search: this.searchQuery,
                });

                this.debtors = res.data.data;
                this.page = res.data.meta.current_page;
                this.perPage = res.data.meta.per_page;
                this.total = res.data.meta.total;
                this.lastPage = res.data.meta.last_page;

                if (
                    this.isInitialLoading ||
                    (!this.searchQuery && this.filter === "all")
                ) {
                    this.updateGlobalStatsLocally();
                }
            } finally {
                this.loading = false;
                this.isInitialLoading = false;
            }
        },

        async loadGlobalStats() {
            try {
                const res = await fetchDebtors({ page: 1, per_page: 1 });
                this.globalStats.totalCount = res.data.meta.total;
                this.updateGlobalStatsLocally();
            } catch (error) {
                console.error("Failed to refresh stats:", error);
            }
        },

        updateGlobalStatsLocally() {
            const total = this.debtors.reduce(
                (sum, d) => sum + Number(d.current_balance),
                0
            );
            this.globalStats.totalOutstanding = total.toLocaleString("en-PH", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
            this.globalStats.totalCount = this.total;
        },

        setSearchQuery(query: string) {
            this.searchQuery = query;
            this.page = 1;

            if (this.searchTimeout) clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                this.loadDebtors();
                this.searchTimeout = null;
            }, 500);
        },

        setFilter(filter: "all" | "outstanding" | "cleared") {
            this.filter = filter;
            this.page = 1;
            this.loadDebtors();
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
            await this.loadDebtors({ page: 1 });
            return res.data;
        },

        async updateDebtor(
            debtorId: number,
            payload: {
                name: string;
                current_balance: number;
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
            await this.loadGlobalStats();
            await this.loadTransactions(debtorId);
        },

        async payAmount(debtorId: number, amount: number) {
            const res = await payDebtorAmountRequest(debtorId, { amount });
            this.debtors = this.debtors.map((d) =>
                d.id === debtorId ? res.data : d
            );
            await this.loadGlobalStats();
            await this.loadTransactions(debtorId);
        },

        async deleteDebtor(debtorId: number) {
            await deleteDebtorRequest(debtorId);

            if (this.debtors.length === 1 && this.page > 1) {
                await this.loadDebtors({ page: this.page - 1 });
            } else {
                await this.loadDebtors({ page: this.page });
            }
        },

        clearTransactions() {
            this.transactions = [];
        },
    },
});
