// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {moneyDetails, rupees, testText} = props
  const {title, imgUrl, imgAlt, moneyClassName} = moneyDetails
  return (
    <li className={`money-details-item ${moneyClassName}`}>
      <img src={imgUrl} alt={imgAlt} className="money-details-img" />
      <div className="details-text-box">
        <p className="money-title">{title}</p>
        <p className="amount" data-testid={testText}>
          Rs {rupees}
        </p>
      </div>
    </li>
  )
}

export default MoneyDetails
