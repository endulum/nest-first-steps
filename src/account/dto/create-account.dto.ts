import { z } from 'zod';
import { requiredString } from 'src/shared/validators/required-string.validator';

export const createAccountSchema = z
  .object({
    email: requiredString().email('Please input a valid email address.'),
    password: requiredString().min(
      8,
      'Passwords must be eight characters long or more.',
    ),
    confirmPassword: requiredString(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type CreateAccountDto = z.infer<typeof createAccountSchema>;
