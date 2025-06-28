import { Prisma } from '@prisma/client';
import { hashPassword } from 'src/shared/helpers/password.helpers';

export const hashPasswordsExtension = Prisma.defineExtension({
  name: 'hash passwords',
  model: {
    user: {
      async $allOperations({
        operation,
        args,
        query,
      }: {
        operation: string;
        args: Prisma.UserCreateArgs | Prisma.UserUpdateArgs;
        query: (...args: any[]) => void;
      }) {
        console.log(operation);
        if (['create', 'update'].includes(operation) && args.data.password) {
          args.data.password = await hashPassword(args.data.password as string);
        }
        return query(args);
      },
    },
  },
});
