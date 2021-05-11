import { graphql, useMutation } from 'relay-hooks';
import { useCallback } from 'react';

const mutation = graphql`
  mutation LogoutMutation($input: LogoutMutationInput!) {
    logout(input: $input) {
      clientMutationId
    }
  }
`;

const useLogoutMutation = mutationProps => {
  const [commit, { loading }] = useMutation(mutation, mutationProps);
  const commitFunction = useCallback(() => {
    return commit({
      variables: {
        input: {},
      },
    });
  }, [commit]);
  return [commitFunction, loading];
};

export default useLogoutMutation;
