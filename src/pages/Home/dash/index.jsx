import { useSelector } from 'react-redux'
import './index.scss'
import { useEffect, useState } from 'react'
import TransactionChart from './chart'
import { getAdminApiData } from '../../../apis/adminData'
import { getUserApiData } from '../../../apis/userData'
import LastTransaction from './lastTransaction'

function DashboardTab() {
  const [loadingState, setLoadingState] = useState(true)
  const [data, setData] = useState([])
  const {loginUserId} = useSelector(state=>state.transaction)

  useEffect(()=>{
    (async()=>{
      setLoadingState(true)
      loginUserId===3 ? setData(await getAdminApiData(loginUserId)) : setData(await getUserApiData(loginUserId))
      setLoadingState(false)
    })()
  }, [loginUserId])

  const renderCreditDebitData=()=>{
    if(data.length===0 || data[0].length===0) {
      return <li key="empty">No Data to Show</li>
    }
    return <>
      {data[0].map(item=>(
        <li className='card'>
              <div className='totalSumCard'>
                <p className={item.type}>
                  ${ item.sum || '0'}
                </p>
                <p className='caption'>
                  {item.type || ''}
                </p>
              </div>
              <div>
                <img src="/creditLogo.png" alt="credit" />
              </div>
          </li>
      ))}
    </>
  }

  const renderLastTransactions=()=>{
    if(data.length===0 || data[1].length===0){
      return <p>No Data to Show</p>
    }
    return (
      <ul>
      {data[1].map(item=>(
        <LastTransaction loginUserId={loginUserId}  item={item} key={item.id} />
      ))}
    </ul>
    )
  }

  const renderChartData=()=>{
    if(data[2].length===0 || data[2].length===0){
      return <div className='empty-card'></div>
    }return <TransactionChart lastSevenDaysTrans={data[2]} />
  }

  return (
    <div className='dashboardTab'>

        <ul className='debitCreditContainer'>
          {
            loadingState ? (<><li className='card empty-card'></li><li className='card empty-card'></li></>) : renderCreditDebitData()
          }
        </ul>

        <div className='lastTransactionsContainer'>
          <p>Last Transactions</p>
          {loadingState ? <div className='loading empty-card'></div> : renderLastTransactions()}
        </div>

        <div className="transactionChart">
          <p>Transaction Chart</p>
          <div className="chart">
            {
              loadingState ? <div className='empty-card'></div> : renderChartData()
            }
          </div>
        </div> 
      
    </div>
  )
}

export default DashboardTab