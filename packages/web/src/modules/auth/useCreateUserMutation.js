import { graphql, useMutation } from 'relay-hooks';
import { useCallback } from 'react';

const mutation = graphql`
  mutation CreateUserMutation($input: CreateUserMutationInput!) {
    createUser(input: $input) {
      jwtToken
    }
  }
`;

const useCreateUserMutation = mutationProps => {
  const [commit, { loading }] = useMutation(mutation, mutationProps);
  const commitFunction = useCallback(
    input => {
      return commit({
        variables: {
          input,
        },
      });
    },
    [commit],
  );
  return [commitFunction, loading];
};

export default useCreateUserMutation;
