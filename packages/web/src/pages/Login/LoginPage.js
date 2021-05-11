import styled from 'styled-components';
import { Notification } from '@example/ui';
import { jwtToken } from '@example/utils';
import { useFormik } from 'formik';
import { useHistory } from "react-router-dom";
import * as yup from 'yup';

import { TextField, Button } from '@material-ui/core';

import useLoginMutation from '../../modules/auth/useLoginMutation';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(3, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const OuterLoginPage = styled.div`
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
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
    onSubmit: (values) => {
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
      <StyledForm onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          name="email"
          label="E-mail"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button type="submit">Submit</Button>
      </StyledForm>
    </OuterLoginPage>
  );
};

export default LoginPage;
