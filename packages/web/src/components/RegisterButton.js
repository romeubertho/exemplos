import { errorConfig, getError, jwtToken } from '@example/utils';
import { Notification } from '@example/ui';
import Button from '@material-ui/core/Button';

import useCreateUserMutation from '../modules/auth/useCreateUserMutation';

const RegisterButton = () => {
  const { enqueueSnackbar } = Notification.useSnackbar();

  const [createUserMutation, { loading }] = useCreateUserMutation({
    onCompleted: ({ createUser }) => {
      jwtToken.set(createUser.jwtToken);
      location.reload();
    },
    onError: errors => {
      const { duplicatedEmail } = errorConfig.user;
      const isUserAlreadyExists = getError(errors, duplicatedEmail.code);

      if (isUserAlreadyExists) {
        enqueueSnackbar('Este usuário já existe!', { variant: 'error' });
      }
    },
  });

  const handleClick = () => {
    return createUserMutation({
      name: 'Lucas',
      lastname: 'Bittencourt',
      email: 'lucasgdbittencourt@gmail.com',
      password: '123',
    });
  };

  return (
    <Button color="primary" onClick={handleClick} disabled={loading}>
      Register
    </Button>
  );
};

export default RegisterButton;
