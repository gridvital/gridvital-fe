import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    refreshTrigger: 0
  },
  reducers: {
    triggerRefresh(state) {
      state.refreshTrigger += 1;
    }
  }
});

export const { triggerRefresh } = dashboardSlice.actions;
export default dashboardSlice.reducer;
