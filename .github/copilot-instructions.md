# Debt Tracker - AI Coding Agent Instructions

## Project Overview

A Vue 3 + TypeScript debt management application with authentication, real-time debt tracking, and transaction history. The backend is a Laravel API (`VITE_API_BASE_URL` env var).

## Architecture & Data Flow

### Core Structure

- **Frontend Framework**: Vue 3 (Composition API), TypeScript
- **State Management**: Pinia stores (`auth.ts`, `debtors.ts`)
- **Routing**: Vue Router with auth guards (meta: `requiresAuth`, `guestOnly`)
- **Styling**: Tailwind CSS 4 + Reka UI component library
- **HTTP**: Axios with duplicate request prevention via `pendingRequests` Map
- **UI Feedback**: vue-sonner toasts (positioned top-right)

### Key Data Models

```typescript
// Debtor: tracks person and their outstanding balance
interface Debtor {
    id: number;
    name: string;
    current_balance: number | string;
    status: "outstanding" | "cleared";
    created_at: string;
    updated_at: string;
}

// Transaction: audit trail for balance changes (add/less)
interface Transaction {
    id: number;
    debtor_id: number;
    type: "add" | "less";
    amount: number;
    balance_before: number;
    balance_after: number;
    created_at: string;
}
```

### Authentication Flow

1. User logs in/registers via `Login.vue` or `Register.vue`
2. `useAuthStore.login()` → calls `loginRequest()` → saves token to localStorage (remember) or sessionStorage
3. Router guard checks `auth.token` in beforeEach hook; redirects `/dashboard` if unauthorized
4. Axios interceptor auto-injects `Authorization: Bearer {token}` header
5. Token/user cleared on logout; debtors store reset is optional

### Debtor Management Flow

1. `Dashboard.vue` → `onMounted` calls `debtorStore.loadDebtors()`
2. Debtors API response → `useDebtorStore` state (paginated list)
3. Search/filter queries → `setSearchQuery()` / `setFilter()` → `loadDebtors()` with params
4. Modal system via `useDashboardModal()`: dispatches `openModal(component, props)` → renders in Dialog
5. Actions (add/edit/delete) → API call → store mutation → toast notification + page reload

## Project-Specific Patterns

### Modal & Form Pattern (Critical)

**Files**: `useDashboardModal.ts`, `components/modals/*.vue`, `composables/useAddDebtorValidation.ts`

All forms use:

1. **Composable validation** (e.g., `useAddDebtorValidation()`) → `errors` ref + `isFormValid` computed
2. **Modal state** via `useDashboardModal()` → `openModal(AddDebtorModal, { debtorId })` → props passed to component
3. **Form submission** → calls API → `await debtorStore.addDebtor()` → closes modal → toast + reload

Example: Adding debtor

```vue
// In AddDebtorModal.vue const { name, amount, errors, isFormValid } =
useAddDebtorValidation(); const handleSubmit = async () => { await
debtorStore.addDebtor({ name, amount }); closeModal(); toast.success("Debtor
added!"); };
```

### Store State Management

**Key patterns**:

- Debtors store owns: debtors[], transactions[], page, perPage, total, lastPage, searchQuery, filter
- **Computed `emptyState`**: returns "empty" | "search" | "filter" for conditional UI rendering
- **Stats computed locally** if showing full list (no search/filter); **API-driven** when filtered
- **Debounced search**: `setSearchQuery()` uses setTimeout to avoid rapid API calls

### Component Hierarchy

```
App.vue (Router outlet + Toaster)
├── LoginView / RegisterView (unauthenticated)
├── DashboardView (main authenticated view)
│   ├── Header (user name, logout button)
│   ├── MetricCard (total outstanding, debtor count)
│   ├── SearchFilter (search input + filter tabs)
│   ├── DebtCard[] (individual debtor cards)
│   ├── Pagination (page navigation)
│   └── Dialog (modal container for all actions)
```

## Build & Development Workflow

### Commands

```bash
npm run dev       # Vite dev server (HMR enabled)
npm run build     # vue-tsc type check + vite build → dist/
npm run preview   # Preview production build locally
npm run test      # Vitest (unit tests with jsdom)
```

### Path Alias

`@` resolves to `src/` (vite.config.ts)

### Environment

- `VITE_API_BASE_URL`: Backend API URL (required for axios)
- `VITE_*`: Public env vars (accessible in client)

## Testing & Quality

- **Unit Tests**: Vitest + Vue Test Utils + jsdom
- **Type Checking**: TypeScript strict mode (`tsconfig.json`)
- **No linting config found**: Follow Vue 3 + TypeScript conventions

## Common Tasks & Code Examples

### Adding a New Action Modal

1. Create `components/modals/MyActionModal.vue`
2. Create `composables/useMyActionValidation.ts` (validation logic)
3. In `useDashboardModal.ts`, add case to dispatch modal:
    ```typescript
    export function openMyActionModal(debtorId: number) {
        openModal(MyActionModal, { debtorId });
    }
    ```
4. Modal component submits → store action → `closeModal()`

### Fetching Debtors with Filters

```typescript
// Debtors store auto-handles pagination + search + filter
await debtorStore.loadDebtors({ page: 2, perPage: 20 });
// OR use setSearchQuery / setFilter then call loadDebtors()
```

### Displaying Toasts

```typescript
import { toast } from "vue-sonner";
toast.success("Action completed!");
toast.error("Something went wrong");
```

## Integration Points & Dependencies

- **Backend**: Laravel API (REST endpoints for auth, debtors, transactions)
- **Reka UI**: Headless component primitives (Dialog, Dropdown, Input, etc.)
- **Lucide Icons**: Icon library (e.g., `Plus`, `Trash2`)
- **html-to-image**: For potential PDF export features (check usage)
- **vueuse**: Utility composables (installed but check actual imports)

## Key Files Reference

- State: [src/stores/auth.ts](src/stores/auth.ts), [src/stores/debtors.ts](src/stores/debtors.ts)
- Types: [src/types/index.ts](src/types/index.ts)
- API: [src/api/](src/api/) (auth.ts, debtor.ts, axios.ts)
- Components: [src/components/](src/components/) + [src/components/ui/](src/components/ui/)
- Composables: [src/composables/](src/composables/) (validation & modal logic)
- Routing: [src/router/index.ts](src/router/index.ts)
