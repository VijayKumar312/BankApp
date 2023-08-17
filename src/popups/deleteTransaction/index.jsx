import {LuLogOut} from 'react-icons/lu'
import {MdCancel} from 'react-icons/md'
import Popup from 'reactjs-popup';

import './index.scss'
import { useSelector } from 'react-redux';

import { deleteTransactionApi } from '../../apis/transactions';

function DeleteTransaction({deleteState, setDeleteState, transaction}) {
  const {loginUserId } = useSelector(state=>state.transaction)

    const onDeleteState=async ()=>{
      try{
        const transId = {
          id: transaction.id
        }
        await deleteTransactionApi(transId, loginUserId)
        setDeleteState()
        window.location.reload()
      }catch(err){
        console.log(err.message) 
      }
    }

  return (
    <Popup open={deleteState} onClose={setDeleteState} modal>
          {(close) => (
            <div className="logoutModalOverlay">
                <div className='logoutContent'>
                    <button className='logoutIcon'><LuLogOut /></button>
                    <div>
                        <h1>Are you sure you want to Delete?</h1>
                        <div>
                            <button className='confirm' onClick={onDeleteState}>Yes, Delete</button>
                            <button className='cancel' onClick={close}>No, Leave it</button>
                        </div>
                    </div>
                    <button className='close' onClick={close} ><MdCancel /></button>
                </div>
            </div>
          )}
        </Popup>
  )
}

export default DeleteTransaction

