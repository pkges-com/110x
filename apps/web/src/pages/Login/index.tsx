import Page from '@/components/Page';
import { Navigate } from 'react-router-dom';

interface SettingsProps extends React.HTMLAttributes<HTMLDivElement> {}

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { LOGIN_URL } from '@shared/utils/const';
import { useLogin } from './hooks';
import { routes } from '@/router/const';

export default function Login({ ...props }: SettingsProps) {
  const { isLoggedIn } = useLogin();

  if (isLoggedIn) {
    return <Navigate to={routes.Home} replace />;
  }

  return (
    <Page {...props}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login To 110x</CardTitle>
        </CardHeader>
        <CardContent>
          In order to unleash the 110x power, we need you to the app. it's
          simple as a single click to login
        </CardContent>
        <CardFooter className="flex justify-end">
          <form action={LOGIN_URL} method="POST">
            <Button>A Nice Login Button</Button>
          </form>
        </CardFooter>
      </Card>
    </Page>
  );
}
