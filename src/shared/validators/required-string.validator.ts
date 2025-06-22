import { z } from 'zod';

export const requiredString = () =>
  z.string({ message: 'This cannot be left blank.' });
