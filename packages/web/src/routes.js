import { Route, Switch, HashRouter } from 'react-router-dom';

import EnvironmentLayout from './layout/EnvironmentLayout';
import HomePage from './pages/Home/HomePage';
import RegisterPage from './pages/Register/RegisterPage';
import LoginPage from './pages/Login/LoginPage';

const Routes = () => (
  <HashRouter>
    <Switch>
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
      <EnvironmentLayout>
        <Route path="/" component={HomePage} />
      </EnvironmentLayout>
    </Switch>
  </HashRouter>
);

export default Routes;
