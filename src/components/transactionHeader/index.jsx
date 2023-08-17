import React from 'react'
import './index.scss'
import { useSelector } from 'react-redux'
import AddTransactionModal from '../../popups/addTransaction'
function TransactionHeader() {
  const [addTransactionState, setAddTransaction] = React.useState(false)
  const {loginUserId} = useSelector(state=>state.transaction)

  const updateAddTransaction=()=>{
    setAddTransaction(!addTransactionState)
  }
  return (
    <div className='transactionHeader'>
            <p>Account</p>
            {loginUserId !== 3 && <button onClick={()=>{setAddTransaction(true)}}>+ Add Transaction</button>}
            {addTransactionState && <AddTransactionModal addTransaction={addTransactionState} setAddTransaction={updateAddTransaction} />}
    </div>
  )
}

export default TransactionHeader