import { Route, Redirect } from 'react-router-dom';
import { useUserContext } from '../context/userContext';
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { state } = useUserContext();
  return (
    <Route
      { ...rest }
      render = {(routeProps) => {
        return state.user ? <Component { ...routeProps } /> : <Redirect to="/" />;
      }
    } />
  );
};

export default PrivateRoute;
