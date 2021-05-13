import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const LoginButton = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/login');
  };

  return <Button onClick={handleClick}>Login</Button>;
};

export default LoginButton;
