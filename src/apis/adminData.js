import axios from "axios"

const adminOptions = {
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
    'x-hasura-role': 'admin',
  },
};

const getLastSevenDaysTrans=async()=>{
    const url = "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-last-7-days-admin"
    try{
      const response = await axios.get(url, adminOptions)
      const data = response.data.last_7_days_transactions_totals_admin
      if(data.length > 0){
        const sortedDates = data.sort((a,b)=> new Date(a.date) - new Date(b.date))
        return sortedDates
      }else{
        return []
      }
    }catch(err){
      console.log(err.message)
    }
  }
 
  const getLastThreeTrans=async()=>{
    const url="https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=3&offset=0"
    try{
      const response = await axios.get(url, adminOptions)
      const data = response.data.transactions
      if(data.length > 0){
        let dateData=[]
        data.forEach(item=>{
          let date = item.date;
          date = new Date(date);

          const options = { day: 'numeric', month: 'short', year: 'numeric' };
          const formattedDate = date.toLocaleDateString('en-US', options);
          dateData.push({...item, date: formattedDate})
        })
        return dateData.slice(0, 3)
      }else{
        return []
      }
      
    }catch(err){
      console.log(err.message)
    }
  }

  const getTotalCreditAndDebit=async()=>{
    //Total Debit and Credit Amount
    const url = "https://bursting-gelding-24.hasura.app/api/rest/transaction-totals-admin"
    try{
      const response = await axios.get(url, adminOptions)
      const data = response.data.transaction_totals_admin
      if(data.length>0){
        const filterData = data.filter(each=> each.type==='credit' || each.type==='debit')
        return filterData
      }else{
        return []
      }
    }catch(err){
      console.log(err.message)
    }
  }

  export const getAdminApiData = async () => {
    try {
      const userDataResponse = await Promise.all([
        getTotalCreditAndDebit(),
        getLastThreeTrans(),
        getLastSevenDaysTrans(),
      ]);
      return userDataResponse
    } catch (err) {
      console.log(err.message);
    }
  };

  export const getAdminTransactionList=async()=>{
    const url=`https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=100&offset=0`
    try{
      const response = await axios.get(url, adminOptions);
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
          data=dateData
      }
      else{
          data=[]
      }
      return data
    }catch(err){
      console.log(err.message)
    }

  }

  export const getAdminProfile=async(loginUserId)=>{
    const url="https://bursting-gelding-24.hasura.app/api/rest/profile"
    try{
      const response = await axios.get(url, adminOptions)
      const data = response.data.users.filter(item=>item.id === loginUserId)
      if(data.length>0){
        return data[0]
      }else{
        return {}
      }
    }catch(err){
      console.log(err.message)
    }
}