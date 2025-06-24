import { req } from '../helpers/req.helper';
import { expectRes } from '../helpers/expectRes.helper';
import { expectErrors } from '../helpers/expectErrors.helper';

describe('POST /account/signup (e2e)', () => {
  const correctForm = {
    username: 'user',
    password: 'correct horse battery staple',
    confirmPassword: 'correct horse battery staple',
  };

  it('400 if input errors', async () => {
    await expectErrors({
      app,
      endpoint: 'POST /account/signup',
      correctForm,
      wrongFields: [
        { username: '' },
        { username: 'a' },
        { username: Array(100).fill('A').join('') },
        { username: '@@@@' },
        { password: '' },
        { password: 'horse' },
        { confirmPassword: '' },
        { confirmPassword: 'incorrect horse battery staple' },
      ],
    });
  });

  it('400 if username is not unique', async () => {
    const existingUser = await prisma.user.create({
      data: { username: 'admin', password: 'correct horse battery staple' },
    });
    const res = await req(app, 'POST /account/signup', {
      form: { ...correctForm, username: existingUser.username },
    });
    expectRes(res, 400, 'Usernames must be unique. Please choose another.');
  });

  it('201 with data', async () => {
    const res = await req(app, 'POST /account/signup', { form: correctForm });
    expectRes(res, 201, 'Account successfully created.');
    expect(res.body.data).toEqual({
      id: 2,
      username: correctForm.username,
    });
  });
});
