import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.scss';
import ProtectedRoute from './ProtectedRoute';

import Login from './pages/Login';
import TransactionsList from './pages/Home/transactionsList';
import Profile from './pages/Home/Profile';
import DashboardTab from './pages/Home/dash';
import NotFound from './pages/not-found';

function App() {
  return (
    <div>
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <ProtectedRoute exact path="/" component={DashboardTab} />
                <ProtectedRoute path="/dashboard" component={DashboardTab} />
                <ProtectedRoute path="/transactions" component={TransactionsList} />
                <ProtectedRoute path="/profile" component={Profile} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
