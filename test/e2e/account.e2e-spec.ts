import { req } from '../helpers/req.helper';
import { expectRes } from '../helpers/expectRes.helper';
import { expectErrors } from '../helpers/expectErrors.helper';

enum Routes {
  Signup = 'POST /account/signup',
  Login = 'POST /account/login',
  Landing = 'GET /account',
}

describe(Routes.Signup, () => {
  const correctForm = {
    username: 'user',
    password: 'correct horse battery staple',
    confirmPassword: 'correct horse battery staple',
  };

  it('400 if input errors', async () => {
    await expectErrors({
      app,
      endpoint: Routes.Signup,
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
    const res = await req(app, Routes.Signup, {
      form: { ...correctForm, username: existingUser.username },
    });
    expectRes(res, 400, 'Usernames must be unique. Please choose another.');
  });

  it('201 with data', async () => {
    const res = await req(app, Routes.Signup, { form: correctForm });
    expectRes(res, 201, 'Account successfully created.');
    expect(res.body.data).toEqual({
      id: 2,
      username: correctForm.username,
    });
  });
});

describe(Routes.Login, () => {
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
      endpoint: Routes.Login,
      correctForm,
      wrongFields: [{ username: '' }, { password: '' }],
    });
  });

  it('400 if incorrect username or password', async () => {
    const message = 'Incorrect username or password.';
    const resIncorrectUsername = await req(app, Routes.Login, {
      form: { ...correctForm, username: 'nonexistent-user' },
    });
    expectRes(resIncorrectUsername, 400, message);
    const resIncorrectPassword = await req(app, Routes.Login, {
      form: { ...correctForm, password: 'incorrect horse battery staple' },
    });
    expectRes(resIncorrectPassword, 400, message);
  });

  it('201 with token', async () => {
    const res = await req(app, Routes.Login, { form: correctForm });
    expectRes(res, 201, 'Successfully logged in.');
    expect(res.body.token).toBeDefined();
  });
});
