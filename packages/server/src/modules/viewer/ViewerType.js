import { getUserOrThrowError } from '../../utils/auth/authentication';
import UserType from '../user/UserType';

export default {
  type: UserType,
  resolve: (_root, _args, context) => getUserOrThrowError(context),
};
