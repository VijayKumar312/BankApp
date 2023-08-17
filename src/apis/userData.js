import axios from "axios"

const getUserOptions=(loginUserId)=>{
  const userOptions={
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
      'x-hasura-role': 'user',
      "x-hasura-user-id": loginUserId
    }
  }
  return userOptions
}
const userLastSevenDaysTrans=async(userId)=>{
    const url="https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days"
    try{
      const response = await axios.get(url, getUserOptions(userId))
      const data = response.data.last_7_days_transactions_credit_debit_totals
      if(data.length>0){
        return data
      }else{
        return []
      }
    }catch(err){
      console.log(err.message)
    }
  }
  const userLastThreeTrans=async(userId)=>{
    const url="https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=3&offset=0"
    try{
      const response = await axios.get(url, getUserOptions(userId))
      const data = response.data.transactions
      if(data.length > 0){
        data.sort((a,b)=> new Date(b.date) - new Date(a.date))
        return data
      }else{
        return []
      }
    }catch(err){
      console.log(err.message)
    }
  }

  const userTotalCreditAndDebit=async(userId)=>{
    const url = "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals"
    try{
      const response = await axios.get(url, getUserOptions(userId))
      const data = response.data.totals_credit_debit_transactions
      if(data.length > 0){
        return data
      }else{
        return []
      }
    }catch(err){
      console.log(err.message)
    }
  }

  export const getUserApiData=async(userId)=>{
      try{
        const userResponseData = await Promise.all([
            userTotalCreditAndDebit(userId),
            userLastThreeTrans(userId),
            userLastSevenDaysTrans(userId)
        ])
        return userResponseData
        
        // const [totalCreditAndDebit, lastThreeTransactions, lastSevenDaysTrans] = userResponseData
      }catch(err){console.log(err.message)}
  }
  
  export const getUserTransactionList=async(userId)=>{
    const url=`https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=100&offset=0`
    const response = await axios.get(url, getUserOptions(userId));
    let data = response.data.transactions;
    if(data.length > 0){
        let dateData=[]
        data.forEach(item=>{
            let date = item.date;
            date = new Date(date);
            const options = { day: 'numeric', month: 'short', year: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-US', options);
            dateData.push({...item, date: formattedDate})
        })
        dateData.sort((a,b)=>new Date(b.date) - new Date(a.date))
        return dateData
    }
    else{
        return []
    }
  }

  export const getUserProfile=async(loginUserId)=>{    
    const url="https://bursting-gelding-24.hasura.app/api/rest/profile"
      const response = await axios.get(url, getUserOptions(loginUserId))
      const data = response.data.users.filter(item=>item.id === loginUserId)
      if(data.length>0){
        return data[0]
      }else{
        return {}
      }
}