import { graphql, useMutation } from 'relay-hooks';
import { useCallback } from 'react';

const mutation = graphql`
  mutation useLoginMutation($input: LoginMutationInput!) {
    login(input: $input) {
      jwtToken
    }
  }
`;

const useLoginMutation = mutationProps => {
  const [commit, { loading }] = useMutation(mutation, mutationProps);
  const commitFunction = useCallback(
    ({ email, password }) => {
      return commit({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
    },
    [commit],
  );
  return [commitFunction, loading];
};

export default useLoginMutation;
