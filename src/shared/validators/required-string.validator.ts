import { z } from 'zod';

export const requiredString = () =>
  z.string().min(1, { message: 'This cannot be left blank.' });
