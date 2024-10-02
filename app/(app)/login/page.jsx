import LoginForm from '@/app/src/components/form/login/LoginForm';
import LoginFormNew from '@/app/src/components/form/login/LoginFormNew';

export const metadata = {
  title: 'Login',
  description: 'Login to your MyPerfectAI user or client account.'
}

const Login = () => {

  return (
    <LoginFormNew />
  );
};

export default Login;
