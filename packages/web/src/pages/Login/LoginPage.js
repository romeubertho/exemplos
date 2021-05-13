import styled from 'styled-components';
import { Notification } from '@example/ui';
import { jwtToken } from '@example/utils';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { TextField, Button } from '@material-ui/core';

import useLoginMutation from '../../modules/auth/useLoginMutation';

const validationSchema = Yup.object({
  email: Yup.string('Enter your email')
    .email('Digite um e-mail válido.')
    .required('E-mail obrigatório.'),
  password: Yup.string('Enter your password')
    .min(3, 'A senha deve ter no mínimo 3 caracteres')
    .required('Senha obrigatória.'),
});

const OuterLoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  padding: 24px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 0 8px -2px rgba(36, 36, 36, 1);
`;

const StyledInputField = styled(TextField)`
  && {
    margin-top: 12px;
  }
`;

const SubmitButton = styled(Button)`
  && {
    margin-top: 16px;
  }
`;

const LoginPage = () => {
  const { enqueueSnackbar } = Notification.useSnackbar();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      loginMutation(values);
    },
  });

  const [loginMutation] = useLoginMutation({
    onCompleted: ({ login }) => {
      jwtToken.set(login.jwtToken);
      history.push('/');
    },
    onError: () => {
      enqueueSnackbar('Não foi possivel autenticar', { variant: 'error' });
    },
  });

  return (
    <OuterLoginPage>
      <LoginForm onSubmit={formik.handleSubmit}>
        <StyledInputField
          fullWidth
          name="email"
          type="email"
          label="E-mail"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          InputLabelProps={{ shrink: true }}
        />

        <StyledInputField
          fullWidth
          name="password"
          type="password"
          label="Senha"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputLabelProps={{ shrink: true }}
        />

        <SubmitButton type="submit" color="primary" variant="contained">
          Entrar
        </SubmitButton>
      </LoginForm>
    </OuterLoginPage>
  );
};

export default LoginPage;
