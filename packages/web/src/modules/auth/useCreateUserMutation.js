import { graphql, useMutation } from 'relay-hooks';
import { useCallback } from 'react';

const mutation = graphql`
  mutation useCreateUserMutation($input: CreateUserMutationInput!) {
    createUser(input: $input) {
      jwtToken
    }
  }
`;

const useCreateUserMutation = mutationProps => {
  const [commit, options] = useMutation(mutation, mutationProps);

  const commitFunction = useCallback(
    input => commit({ variables: { input } }),
    [commit],
  );

  return [commitFunction, options];
};

export default useCreateUserMutation;
