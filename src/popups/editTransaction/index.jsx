import React, {useState} from 'react'
import Popup from 'reactjs-popup';
import { useSelector } from 'react-redux';
import './index.scss'
import { editTransactionApi } from '../../apis/transactions';

const EditTransactionModal = ({ transaction, editState, setEditState }) => {
    console.log(transaction)
    const [name, setName] = useState(transaction.transaction_name || "")
    const [transactionType, setTransactionType] = useState(transaction.type)
    const [category, setCategory] = useState(transaction.category)
    const [amount, setAmount] = useState(transaction.amount || "")

    const dateFormat = new Date(transaction.date);
    const timezoneOffset = dateFormat.getTimezoneOffset(); // Get the time zone offset in minutes
    dateFormat.setMinutes(dateFormat.getMinutes() - timezoneOffset); // Adjust the date by the offset
    const formattedDate = dateFormat.toISOString().substr(0, 10);

    const [date, setDate] = useState(formattedDate)

    const {loginUserId } = useSelector((state)=>state.transaction)

    const onFormSubmit=async()=>{
        let standardDate = new Date(date)
        const transactionDetails = {
            id: transaction.id,
            name,
            type: transactionType,
            category,
            amount,
            date: standardDate.toISOString(),
    }
    try{
        await editTransactionApi(transactionDetails, loginUserId)
        setEditState()
        window.location.reload()
    }catch(err){
        console.log(err.message)
    }
    }

  return (
    <Popup open={editState} onClose={setEditState} modal>
          {(close) => (
            <div className="modalOverlay">
                <div>
                    <div className='closeButton'>
                        <button onClick={close}>Close</button>
                    </div>
                    <div className="modalContent">
                        <h2>Update Transaction</h2>
                        <p>You can update your transaction here</p>
                        <form>
                            <label htmlFor='username'>Enter Name</label>
                            <input className='input' type='text' value={name} id='username' onChange={(event)=>{setName(event.target.value)}} />
                            <label htmlFor='transactionType'>Transaction Type</label>
                            <select className='input' id='transactionType' value={transactionType} onChange={(event)=>{setTransactionType(event.target.value)}}>
                                <option className='option' value={'credit'}>Credit</option>
                                <option className='option' value={'debit'}>Debit</option>
                            </select>
                            <label htmlFor='category'>Category</label>
                            <select className='input' id='category' value={category} onChange={(event)=>{setCategory(event.target.value)}}>
                                <option className='option' value="shopping">Shopping</option>
                                <option className='option' value='transfer'>Transfer</option>
                                <option className='option' value='other'>Other</option>
                            </select>
                            <label htmlFor='amount'>Amount</label>
                            <input className='input' id='amount' value={amount} type='number' onChange={(event)=>{setAmount(event.target.value)}} />
                            <label htmlFor='date'>Date</label>
                            <input className='input' id='date' type='date' value={date} onChange={(event)=>{setDate(event.target.value)}} />
                        </form>
                        <button onClick={onFormSubmit}>Edit Transaction</button>
                    </div>
                </div>
            </div>
          )}
        </Popup>
  );
};

export default EditTransactionModal;
