import { useAuthStore } from '@/stores/auth';
import { BASE_URL } from '@shared/utils/const';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const getUser = async (token: string) => {
  try {
    const response = await fetch(BASE_URL + '/users/me', {
      headers: {
        Authorization: token,
      },
    });

    const data = await response.json();
    return data.user;
  } catch (error) {
    return null;
  }
};

export const useLogin = () => {
  const [user, setToken, setUser] = useAuthStore((state) => [
    state.user,
    state.setToken,
    state.setUser,
  ]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    (async () => {
      const token = searchParams.get('token');
      if (token) {
        const user = await getUser(token);

        if (!user) {
          return; // TODO: handle error
        }

        setToken(token);
        setUser(user);
        setSearchParams?.({});
      }
    })();
  }, [searchParams]);

  return {
    isLoggedIn: !!user?.sub,
  };
};
