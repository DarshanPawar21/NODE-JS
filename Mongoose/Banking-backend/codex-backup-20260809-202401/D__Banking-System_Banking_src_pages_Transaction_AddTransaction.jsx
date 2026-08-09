import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { fetchAccounts, updateAccount } from "../../redux/features/accountSlice";
import { addTransaction } from "../../redux/features/transactionSlice";
import "./AddTransaction.css";

function AddTransaction() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { accounts } = useSelector((state) => state.accounts);

  const [transaction, setTransaction] = useState({
    customerName: "",
    accountId: "",
    accountNumber: "",
    type: "Deposit",
    amount: "",
    balance: 0,
    date: new Date().toISOString().split("T")[0],
  });

  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const handleAccount = (e) => {
    const id = e.target.value;
    const account = accounts.find((acc) => acc.id === id);

    if (account) {
      setError("");
      setTransaction((prev) => ({
        ...prev,
        accountId: account.id,
        accountNumber: account.accountNumber,
        customerName: account.customerName,
        balance: Number(account.openingBalance),
      }));
    }
  };

  const handleType = (type) => {
    setError("");
    setTransaction((prev) => ({ ...prev, type }));
  };

  const handleChange = (e) => {
    setError("");
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const account = accounts.find((acc) => acc.id === transaction.accountId);

    if (!account) {
      setError("Please select an account.");
      return;
    }

    const amount = Number(transaction.amount);
    let newBalance = Number(account.openingBalance);

    if (transaction.type === "Deposit") {
      newBalance += amount;
    } else {
      if (amount > newBalance) {
        setError("Insufficient balance for this withdrawal.");
        return;
      }

      newBalance -= amount;
    }

    // Update Account Balance
    dispatch(
      updateAccount({
        ...account,
        openingBalance: newBalance,
      })
    );

    // Save Transaction
    dispatch(
      addTransaction({
        ...transaction,
        amount,
        balance: newBalance,
      })
    );

    navigate("/transactions");
  };

  const amountNum = Number(transaction.amount) || 0;
  const projectedBalance =
    transaction.type === "Deposit"
      ? transaction.balance + amountNum
      : transaction.balance - amountNum;
  const isInsufficient =
    transaction.type === "Withdraw" && amountNum > transaction.balance;

  return (
    <Layout>
      <div className="cbs-txn-form">
        <div className="cbs-txn-form__header">
          <h2 className="cbs-txn-form__title">New Transaction</h2>
          <p className="cbs-txn-form__subtitle">
            Record a deposit or withdrawal against a customer account
          </p>
        </div>

        <div className="cbs-card cbs-txn-form__card">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="cbs-txn-form__error" role="alert">
                {error}
              </div>
            )}

            <div className="cbs-field">
              <label>Select Account</label>
              <select className="cbs-field__input" onChange={handleAccount} required>
                <option value="">Select Account</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.accountNumber} - {account.customerName}
                  </option>
                ))}
              </select>
            </div>

            <div className="cbs-field">
              <label>Transaction Type</label>
              <div className="cbs-txn-type">
                <button
                  type="button"
                  className={
                    "cbs-txn-type__btn cbs-txn-type__btn--deposit" +
                    (transaction.type === "Deposit" ? " is-active" : "")
                  }
                  onClick={() => handleType("Deposit")}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14" />
                    <path d="M6 13l6 6 6-6" />
                  </svg>
                  Deposit
                </button>
                <button
                  type="button"
                  className={
                    "cbs-txn-type__btn cbs-txn-type__btn--withdraw" +
                    (transaction.type === "Withdraw" ? " is-active" : "")
                  }
                  onClick={() => handleType("Withdraw")}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19V5" />
                    <path d="M6 11l6-6 6 6" />
                  </svg>
                  Withdraw
                </button>
              </div>
            </div>

            <div className="cbs-txn-form__grid">
              <div className="cbs-field">
                <label>Customer</label>
                <input
                  className="cbs-field__input cbs-field__input--readonly"
                  value={transaction.customerName}
                  readOnly
                />
              </div>

              <div className="cbs-field">
                <label>Amount</label>
                <input
                  type="number"
                  className="cbs-field__input"
                  name="amount"
                  value={transaction.amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="cbs-field">
                <label>Current Balance</label>
                <input
                  className="cbs-field__input cbs-field__input--readonly"
                  value={`₹ ${transaction.balance}`}
                  readOnly
                />
              </div>

              <div className="cbs-field">
                <label>Date</label>
                <input
                  className="cbs-field__input cbs-field__input--readonly"
                  value={transaction.date}
                  readOnly
                />
              </div>
            </div>

            {transaction.accountId && amountNum > 0 && (
              <div
                className={
                  "cbs-txn-preview" +
                  (isInsufficient ? " cbs-txn-preview--danger" : "")
                }
              >
                <span>Projected balance after this transaction</span>
                <strong>₹ {projectedBalance}</strong>
              </div>
            )}

            <button className="cbs-btn cbs-btn--success">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Submit Transaction
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default AddTransaction;