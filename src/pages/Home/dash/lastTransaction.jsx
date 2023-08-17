import React, {useState} from 'react'
import './index.scss'
import DeleteTransaction from '../../../popups/deleteTransaction'
import EditTransactionModal from '../../../popups/editTransaction'

function LastTransaction({item, loginUserId}) {
    const [editState, setEditState] = useState(false)
    const [deleteState, setDeleteState] = useState(false)

    const updateEditState=()=>{
        setEditState(!editState)
    }
    const updateDeleteState=()=>{
        setDeleteState(!deleteState)
    }
    const customDate=(date)=>{
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = new Date(date).toLocaleDateString('en-US', options);
        return formattedDate
    }
  return (
    <li className='transactionItem'>
        <img src={item.type==='debit' ? '/transactions/debit.png' : '/transactions/credit.png'} alt={item.type} />
        <p>{item.transaction_name}</p>
        <p className='category'>{item.category}</p>
        <p className='date'>{customDate(item.date)}</p>
        <p><span>{item.type==='DEBIT' ? '-' : '+'}</span>{item.amount}</p>
        {loginUserId !==3 && <button onClick={()=>{setEditState(!editState)}}><img src="/transactions/edit.png" alt="EDIT" /></button>}
        {loginUserId !==3 && <button onClick={()=>setDeleteState(!deleteState)}><img src="/transactions/delete.png" alt="DELETE" /></button>}
        {
            deleteState && <DeleteTransaction transaction={item} deleteState={deleteState} setDeleteState={updateDeleteState} />
        }
        {
            editState && <EditTransactionModal transaction={item} editState={editState} setEditState={updateEditState} />
        }
  </li>
  )
}

export default LastTransaction