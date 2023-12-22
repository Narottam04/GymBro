import { create } from "zustand";

interface LogStore {
  logs: Record<string, any>; // You might have a better-defined structure
  updateLog: (logEntry: Record<string, any>) => void;
  resetLog: () => void;
}

const useLogStore = create<LogStore>((set) => ({
  logs: {},
  updateLog: (logEntry) => set((state) => ({ logs: { ...state.logs, ...logEntry } })),
  resetLog: () => set({ logs: {} })
}));

export default useLogStore;
