// composables/useDebtCard.ts
export function useDebtCard(id: number, emit: any) {
  const handleAction = (
    action: "add" | "less" | "edit" | "delete" | "view"
  ) => {
    emit("action", { action, id });
  };

  return {
    handleAction,
  };
}
