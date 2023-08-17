import React, {useState, useEffect} from 'react'
import { useSelector} from "react-redux";
import TransactionItem from './transactionItem';
import Loader from '../../../components/Loader/loader';
import './index.scss';
import { getAdminTransactionList } from '../../../apis/adminData';
import { getUserTransactionList } from '../../../apis/userData';

const transactionTypes = [{display: 'All Transactions'}, {display: 'debit'}, {display: 'credit'}]
const TransactionsList = () => {
    const [activeTransTab, setActiveTransTab] = useState(transactionTypes[0].display)
    const [loadingState, setLoadingState] = useState(false)
    const [transactionData, setTransactionData] = useState([])
    const [transactionsList, setData] = useState([])
    const {loginUserId} = useSelector(state=>state.transaction)

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('PinScaleBank'))
        if(data && data.activeTransactionTab){
            let activeTransTab = data.activeTransactionTab;
            setActiveTransTab(activeTransTab);
        }
    },[])
    useEffect(()=>{
        (async()=>{
            setLoadingState(true)
            let data=''
            loginUserId===3 ? data=await getAdminTransactionList(loginUserId) : data=await getUserTransactionList(loginUserId)
            setData(data)
            setTransactionData(data)
            setLoadingState(false)
        })()
    },[loginUserId])

    const updateTransactionTab=(tab)=>{
        setActiveTransTab(tab)
        //update local storage
        const data = JSON.parse(localStorage.getItem('PinScaleBank'));
        localStorage.setItem("PinScaleBank",JSON.stringify({...data, activeTransactionTab: tab}));
        if(tab === 'All Transactions'){
            setTransactionData(transactionsList)
        }else{
            let result = transactionsList.filter(each=>each.type === tab)
            setTransactionData(result)
        }
    }

    const renderDataView=()=> {
        return (
            <ul className='transactionItems'>
                {transactionData.map(item => (
                    <TransactionItem key={item.id} item={item} loginId={loginUserId} />
                ))}
            </ul>
        );
    }
    const handleEmptyView = () =>{
        if (transactionData.length===0) {
            return <p>No Data to Display</p>
        }
        return renderDataView()
    }

  if(loadingState){
    return <Loader />
  }else{
    return (
        <div className='transactionsTab'>
            <ul className='transactionType'>
                {
                    transactionTypes.map(each=>(
                        <li key={each.id} onClick={()=>{updateTransactionTab(each.display)}} className={each.display===activeTransTab && 'active'}>{each.display}</li>
                    ))
                }
            </ul>
            <div className='transactionListContainer'>
                <div className='userHeadings'>
                    <p className='name'>Transaction Name</p>
                    <p className='category'>Category</p>
                    <p className='date'>Date</p>
                    <p className='amount'>Amount</p>
                </div>
                {
                    handleEmptyView()
                }
            </div>
        </div>
      )
  }
}

export default TransactionsList;
