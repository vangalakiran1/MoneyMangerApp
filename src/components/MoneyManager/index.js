import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

const moneyDetailsArray = [
  {
    id: uuidv4(),
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
    imgAlt: 'balance',
    title: 'Your Balance',
    moneyClassName: 'your-balance',
  },
  {
    id: uuidv4(),
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
    imgAlt: 'income',
    title: 'Your Income',
    moneyClassName: 'your-income',
  },
  {
    id: uuidv4(),
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
    imgAlt: 'expenses',
    title: 'Your Expenses',
    moneyClassName: 'your-expenses',
  },
]
// const newArray = [
//   {
//     id: uuidv4(),
//     title: 'salary',
//     amount: 50000,
//     type: 'INCOME',
//   },
//   {
//     id: uuidv4(),
//     title: 'EMI',
//     amount: 2000,
//     type: 'EXPENSES',
//   },
//   {
//     id: uuidv4(),
//     title: 'business',
//     amount: 60000,
//     type: 'INCOME',
//   },
// ]

// Write your code here

class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    type: transactionTypeOptions[0].optionId,
    historyList: [],
  }

  userTitle = event => {
    this.setState({title: event.target.value})
  }

  userAmount = event => {
    this.setState({amount: event.target.value})
  }

  transactionType = event => {
    this.setState({type: event.target.value})
  }

  transactionHistoryDetails = e => {
    e.preventDefault()
    const {title, amount, type} = this.state
    const newHistory = {
      id: uuidv4(),
      title,
      amount,
      type,
    }

    this.setState(prevState => ({
      historyList: [...prevState.historyList, newHistory],
      title: '',
      amount: '',
      type: transactionTypeOptions[0].optionId,
    }))
  }

  totalIncomeAmount = () => {
    const {historyList} = this.state
    const incomeAmount = historyList.filter(eachHistory => {
      if (eachHistory.type === 'INCOME') {
        return eachHistory.amount
      }
      return ''
    })
    // const getAmount = incomeAmount.map(eachHistory => eachHistory.amount)
    const initialValue = 0
    const add = incomeAmount.reduce(
      (acc, current) => acc + parseInt(current.amount),
      initialValue,
    )

    return add
  }

  totalExpensesAmount = () => {
    const {historyList} = this.state
    const filteredExpenses = historyList.filter(eachItem => {
      if (eachItem.type === 'EXPENSES') {
        return eachItem
      }
      return ''
    })
    const initialValue = 0
    const expensesAdd = filteredExpenses.reduce(
      (acc, current) => acc + parseInt(current.amount),
      initialValue,
    )
    return expensesAdd
  }

  yourBalance = (totalIncomeAmount, totalExpensesAmount) => {
    const answer = totalIncomeAmount - totalExpensesAmount
    return answer
  }

  deleteTransaction = id => {
    this.setState(prevState => ({
      historyList: prevState.historyList.filter(eachHistory => {
        if (eachHistory.id !== id) {
          return eachHistory
        }
        return ''
      }),
    }))
  }

  render() {
    const {title, amount, type, historyList} = this.state
    const totalIncomeAmount = this.totalIncomeAmount()
    const totalExpensesAmount = this.totalExpensesAmount()
    const yourBalance = this.yourBalance(totalIncomeAmount, totalExpensesAmount)

    return (
      <div className="container">
        <div className="header-section">
          <h1 className="heading">Hi, Richard</h1>
          <p className="sub-heading">
            Welcome back to your
            <span className="blue-text-color"> Money Manger</span>
          </p>
        </div>
        <ul className="money-details-container">
          <MoneyDetails
            moneyDetails={moneyDetailsArray[0]}
            rupees={yourBalance}
            testText="balanceAmount"
          />
          <MoneyDetails
            moneyDetails={moneyDetailsArray[1]}
            rupees={totalIncomeAmount}
            testText="incomeAmount"
          />
          <MoneyDetails
            moneyDetails={moneyDetailsArray[2]}
            rupees={totalExpensesAmount}
            testText="expensesAmount"
          />
        </ul>
        <div className="transaction-details-container">
          <div className="add-transaction">
            <h1 className="add-transaction-heading">Add Transaction</h1>
            <form onSubmit={this.transactionHistoryDetails}>
              <div className="user-input-field">
                <label htmlFor="transactionTitle">TITLE</label>
                <input
                  placeholder="Title"
                  id="transactionTitle"
                  onChange={this.userTitle}
                  value={title}
                  autoComplete="OFF"
                />
              </div>
              <div className="user-input-field">
                <label htmlFor="transactionAmount">AMOUNT</label>
                <input
                  placeholder="Amount"
                  id="transactionAmount"
                  onChange={this.userAmount}
                  value={amount}
                  autoComplete="OFF"
                />
              </div>
              <label htmlFor="transactionSelect" className="transaction-type">
                TYPE
              </label>
              <select
                className="select-options"
                id="transactionSelect"
                onChange={this.transactionType}
                value={type}
              >
                {transactionTypeOptions.map(eachItem => (
                  <option value={eachItem.optionId} key={eachItem.optionId}>
                    {eachItem.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
          </div>
          <div className="transaction-history">
            <h1 className="history-heading add-transaction-heading">History</h1>
            <ul className="history-list-container">
              <li className="list-header">
                <p>Title</p>
                <p>Amount</p>
                <p>Type</p>
              </li>
              {historyList.map(eachHistory => (
                <TransactionItem
                  key={eachHistory.id}
                  historyDetails={eachHistory}
                  onClickDeleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
