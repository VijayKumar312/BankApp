import axios from "axios";
const getHeaders = (loginUserId) => {
  const headers = {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
    'x-hasura-role': 'user',
    "x-hasura-user-id": loginUserId
  }
  return headers;
};

export const addTransactionApi = async (transactionDetails, loginUserId) => {
  const url = "https://bursting-gelding-24.hasura.app/api/rest/add-transaction";
  const data = transactionDetails
  const headers = getHeaders(loginUserId)
  try{
    const response = await axios.post(url, data, {headers})
    return response.data.insert_transactions_one
  }catch(err){
    console.log(err.message)
  }
};

export const editTransactionApi=async(transactionDetails, loginUserId)=>{
  const url="https://bursting-gelding-24.hasura.app/api/rest/update-transaction"
  const data= transactionDetails
  const headers=getHeaders(loginUserId)
  try{
    const response = await axios.post(url, data, {headers})
    return response.data.update_transactions_by_pk    
  }
  catch(err){
      console.log(err.message)
  }
}

export const deleteTransactionApi=async(transaction, loginUserId)=>{
  const url="https://bursting-gelding-24.hasura.app/api/rest/delete-transaction"
  const data=JSON.stringify(transaction) //{id: ..}
  const headers=getHeaders(loginUserId)
  try{
   const response=await axios.delete(url, {data, headers})
   return response.data.delete_transactions_by_pk
  }catch(err){
    console.log(err.message)
  }
}