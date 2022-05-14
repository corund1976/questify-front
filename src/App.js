import { useEffect, Suspense, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';

import { userRefresh } from './redux/user/operation';
import { routes, PublicRoute, PrivateRoute } from './routes';

import './App.css';

const AuthPage = lazy(() =>
  import('./pages/AuthPage' /* webpackChunkName: 'AuthPage' */),
);
const HomePage = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName: 'HomePage' */),
);
const ResetPage = lazy(() =>
  import('./pages/ResetPasswordPage' /* webpackChunkName: 'HomePage' */),
);
const ChangePassword = lazy(() =>
  import('./pages/ChangePasswordPage' /* webpackChunkName: 'HomePage' */),
);

function App() {
  console.log("App.js");

  const dispatch = useDispatch();
  // const isUserLoggedIn = useSelector(getIsLoggedIn);
  const userLoggedIn = localStorage.getItem('isloggedIn');

  useEffect(() => {
    if (userLoggedIn) dispatch(userRefresh());
    console.log('userLoggedIn', userLoggedIn);
    console.log('App.js useEffect dispatch(userRefresh())');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="App">
      <Suspense
        fallback={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TailSpin color="#00BFFF" height={100} width={100} />
          </div>
        }
      >
        <Switch>
          <PublicRoute path={routes.auth} restricted>
            <AuthPage />
          </PublicRoute>

          <PublicRoute path={routes.reset} restricted>
            <ResetPage />
          </PublicRoute>

          <PublicRoute path={routes.changePassword} restricted>
            <ChangePassword />
          </PublicRoute>

          <PrivateRoute path={routes.home} restricted redirectTo={routes.auth}>
            <HomePage />
          </PrivateRoute>

          <Redirect to={routes.auth} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
