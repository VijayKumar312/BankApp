import { useState } from 'react';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import './index.scss';

import {getLoginUserId, getUserData} from '../../store/transactionSlice'
import { useDispatch } from 'react-redux';
import { getAdminProfile } from '../../apis/adminData';
import { getUserProfile } from '../../apis/userData';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [loadingState, setLoadingState] = useState(false)

  const dispatch = useDispatch()
  const onSubmitForm = async () => {
    setLoadingState(true)
    setErrMsg("")
    localStorage.removeItem('PinScaleBank')
    const url = `https://bursting-gelding-24.hasura.app/api/rest/get-user-id?email=${email}&password=${password}`;
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'admin',
      },
    };
    try {
      const response = await axios(url, options);
      const {id} = response.data.get_user_id[0]

      const userProfile = id===3 ? await getAdminProfile(id) : await getUserProfile(id)
      dispatch(getLoginUserId(id))
      dispatch(getUserData(userProfile))

      localStorage.setItem('PinScaleBank', JSON.stringify({userId: id}))

      const {history} = props
      history.replace("/dashboard")
    } catch (error) {
      console.error(error);
      setErrMsg("Incorrect Username/Passowrd");
      setLoadingState(false)
    }
  };

  return (
    <div className='loginPage'>
      <div>
        <form>
          <label htmlFor='email'>Enter Username</label>
          <input type='email' id='email' value={email} onChange={(event) => setEmail(event.target.value)} />
          <label htmlFor='password'>Enter Password</label>
          <input type='password' id='password' value={password} onChange={(event) => setPassword(event.target.value)} />
        </form>
        <button onClick={onSubmitForm}>{loadingState ? <ColorRing wrapperClass='loader' /> : 'Submit'}</button>
        <p className='error'>{errMsg}</p>
      </div>
    </div>
  );
}

export default Login;
