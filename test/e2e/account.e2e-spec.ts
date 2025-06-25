import { req } from '../helpers/req.helper';
import { expectRes } from '../helpers/expectRes.helper';
import { expectErrors } from '../helpers/expectErrors.helper';

enum Routes {
  Signup = 'POST /account/signup',
  Login = 'POST /account/login',
  CheckAccount = 'GET /account',
  EditAccount = 'POST /account',
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
    await prisma.createUser({ ...correctForm });
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
    expect(res.body.data.token).toBeDefined();
  });
});

describe(Routes.CheckAccount, () => {
  const loginForm = {
    username: 'user',
    password: 'password',
  };

  beforeAll(async () => {
    await prisma.clear();
    await prisma.createUser({ ...loginForm });
  });

  it('401 if no token', async () => {
    const res = await req(app, Routes.CheckAccount);
    expectRes(res, 401, 'Please log in.');
  });

  it('200 with data', async () => {
    let res = await req(app, Routes.Login, { form: loginForm });
    const token = res.body.data.token;
    res = await req(app, Routes.CheckAccount, { token });
    expectRes(res, 200);
  });
});

describe(Routes.EditAccount, () => {
  const correctForm = {
    username: 'alice',
    password: 'staple battery horse correct',
    confirmPassword: 'staple battery horse correct',
    currentPassword: 'correct horse battery staple',
  };
  let token: string;

  beforeAll(async () => {
    await prisma.clear();
    const bob = await prisma.createUser({
      username: 'bob',
      password: correctForm.currentPassword,
    });
    token = await jwt.signAsync({ id: bob.id, username: bob.username });
  });

  it('400 if input errors', async () => {
    await expectErrors({
      app,
      endpoint: Routes.EditAccount,
      token,
      correctForm,
      wrongFields: [
        { username: '' },
        { confirmPassword: '' },
        { currentPassword: '' },
        { username: 'a' },
        { username: '&&&&' },
        { password: '' },
        { password: '.' },
      ],
    });
  });

  it('400 if username is not unique', async () => {
    const otherUser = await prisma.createUser({
      username: 'eve',
      password: 'password',
    });
    const incorrectForm = { ...correctForm, username: otherUser.username };
    const res = await req(app, Routes.EditAccount, {
      token,
      form: { ...incorrectForm },
    });
    expectRes(res, 400, 'Usernames must be unique. Please choose another.');
    await prisma.user.delete({ where: { id: otherUser.id } });
  });

  it('201 with data', async () => {
    let res = await req(app, Routes.EditAccount, {
      token,
      form: correctForm,
    });
    expectRes(res, 201, 'Successfully changed account details.');
    expect(res.body.data.username).toEqual(correctForm.username);

    // can log in with new password afterward
    res = await req(app, Routes.Login, {
      form: {
        username: correctForm.username,
        password: correctForm.password,
      },
    });
    expectRes(res, 201, 'Successfully logged in.');
  });
});
