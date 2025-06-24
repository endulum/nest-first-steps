import { req } from '../helpers/req.helper';
import { expectRes } from '../helpers/expectRes.helper';
import { expectErrors } from '../helpers/expectErrors.helper';

describe('POST /account/signup', () => {
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

describe('POST /account/login', () => {
  const correctForm = {
    username: 'user',
    password: 'correct horse battery staple',
  };

  beforeAll(async () => {
    await prisma.clear();
    await prisma.user.create({ data: correctForm });
  });

  it('400 if input errors', async () => {
    await expectErrors({
      app,
      endpoint: 'POST /account/login',
      correctForm,
      wrongFields: [{ username: '' }, { password: '' }],
    });
  });

  it('400 if incorrect username or password', async () => {
    const message = 'Incorrect username or password.';
    const resIncorrectUsername = await req(app, 'POST /account/login', {
      form: { ...correctForm, username: 'nonexistent-user' },
    });
    expectRes(resIncorrectUsername, 400, message);
    const resIncorrectPassword = await req(app, 'POST /account/login', {
      form: { ...correctForm, password: 'incorrect horse battery staple' },
    });
    expectRes(resIncorrectPassword, 400, message);
  });

  it('201 with token', async () => {
    const res = await req(app, 'POST /account/login', { form: correctForm });
    expectRes(res, 201, 'Successfully logged in.');
    expect(res.body.token).toBeDefined();
  });
});
