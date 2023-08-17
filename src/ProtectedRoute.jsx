import { Redirect, Route } from 'react-router-dom'
import Sidebar from './components/sidebar'
import TransactionHeader from './components/transactionHeader'
import './App.scss'
import { useDispatch } from 'react-redux'
import { getLoginUserId } from './store/transactionSlice'

function ProtectedRoute(props) {
    const dispatch = useDispatch()
    const bank=JSON.parse(localStorage.getItem("PinScaleBank"))

    if(!bank){
        return <Redirect to="/login" />
    }else{
        if(props.path==="/"){
            return <Redirect to="/dashboard"  />
        }else{
            dispatch(getLoginUserId(bank.userId))
            return (
                <div className='homeContainer'>
                    <Sidebar />
                    <div className='contentContainer'>
                        <TransactionHeader />
                        <Route {...props} /> 
                    </div>
                </div>
            ) 
        }
    }
}

export default ProtectedRoute