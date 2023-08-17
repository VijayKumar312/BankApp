import React, {useState} from 'react'
import Popup from 'reactjs-popup'
import { useSelector } from 'react-redux';
import { addTransactionApi } from '../../apis/transactions';
import './index.scss'

const AddTransactionModal = ({ addTransaction, setAddTransaction }) => {
    const [name, setName] = useState('')
    const [transactionType, setTransactionType] = useState('credit')
    const [category, setCategory] = useState('shopping')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')

    const { loginUserId } = useSelector((state)=>state.transaction)

    const onFormSubmit=async(event)=>{
        const transactionDetails = {
                name,
                type: transactionType,
                category,
                amount,
                date: (new Date(date)).toISOString(),
                user_id: loginUserId
        }
        try{
            await addTransactionApi(transactionDetails, loginUserId)
            setAddTransaction()
            window.location.reload()
        }catch(err){
            console.log(err.message)
        }
    }

  return (
    <Popup open={addTransaction} onClose={setAddTransaction} modal>
          {(close) => (
            <div className="modalOverlay">
                <div>
                    <div className='closeButton'>
                        <button onClick={close}>Close</button>
                    </div>
                    <div className="modalContent">
                        <h2>Add Transaction</h2>
                        <form>
                        <label htmlFor='username'>Enter Name</label>
                        <input className='input' type='text' id='username' onChange={(event)=>{setName(event.target.value)}} />
                        <label htmlFor='transactionType'>Transaction Type</label>
                        <select className='input' id='transactionType' onChange={(event)=>{setTransactionType(event.target.value)}}>
                            <option className='option' value='credit'>Credit</option>
                            <option className='option' value='debit'>Debit</option>
                        </select>
                        <label htmlFor='category'>Category</label>
                        <select className='input' id='category' onChange={(event)=>{setCategory(event.target.value)}}>
                            <option className='option' value="shopping">Shopping</option>
                            <option value="transfer">Transfer</option>
                        </select>
                        <label htmlFor='amount'>Amount</label>
                        <input className='input' id='amount' type='number' onChange={(event)=>{setAmount(event.target.value)}} />
                        <label htmlFor='date'>Date</label>
                        <input className='input' id='date' type='date' onChange={(event)=>{setDate(event.target.value)}} />
                        </form>
                        <button onClick={onFormSubmit}>Add Transaction</button>
                    </div>
                </div>
            </div>
          )}
        </Popup>
  );
};

export default AddTransactionModal;
