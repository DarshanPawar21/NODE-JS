import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// Fetch Transactions
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const res = await api.get("/transactions");
    return res.data;
  }
);

// Add Transaction
export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transaction) => {
    const res = await api.post("/transactions", transaction);
    return res.data;
  }
);

// Delete Transaction
export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id) => {
    await api.delete(`/transactions/${id}`);
    return id;
  }
);

const transactionSlice = createSlice({
  name: "transactions",

  initialState: {
    transactions: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })

      .addCase(fetchTransactions.rejected, (state) => {
        state.loading = false;
      })

      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })

      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        );
      });
  },
});

export default transactionSlice.reducer;