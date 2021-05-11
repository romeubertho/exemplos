import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

const LoginButton = () => {
  let history = useHistory();

  const handleClick = () => {
    history.push('/login');
  }

  return (
    <Button onClick={handleClick}>Login</Button>
  );
};

export default LoginButton;
