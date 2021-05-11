import { useMutation } from 'relay-hooks';
import Button from '@material-ui/core/Button';
import { jwtToken } from '@example/utils';

import useLogoutMutation from '../modules/auth/useLogoutMutation';

const LogoutButton = () => {
  const [logoutMutation, loading] = useLogoutMutation({
    onCompleted: () => {
      jwtToken.destroy();
      location.reload();
    },
  });

  const handleClick = () => logoutMutation();

  return (
    <Button color="primary" onClick={handleClick} disabled={loading}>
      Logout
    </Button>
  );
};

export default LogoutButton;
