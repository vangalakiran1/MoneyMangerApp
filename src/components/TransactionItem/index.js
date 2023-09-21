// Write your code here
import './index.css'

const TransactionItem = props => {
  const {historyDetails, onClickDeleteTransaction} = props
  const {title, amount, type, id} = historyDetails
  const deleteTransactionHistory = () => {
    onClickDeleteTransaction(id)
  }
  return (
    <li className="history-list">
      <p>{title}</p>
      <p>Rs {amount}</p>
      <p>{type}</p>
      <button
        type="button"
        className="delete-btn"
        onClick={deleteTransactionHistory}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default TransactionItem
