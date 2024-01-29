import React from 'react';
import { Actions } from '../../enums';
import { Login } from './Login';
import { sendMessage } from '../../utils';
import { BASE_URL } from '@shared/utils';

type User = {
  sub: string;
  name: string;
  picture: string;
};

export default function Popup(): JSX.Element {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<User | null>(null);

  const getUser = async () => {
    const res = await sendMessage({ type: Actions.GET_USER });
    setLoading(false);

    if (res) setUser(res.user);
  };

  const logout = async () => {
    await sendMessage({ type: Actions.LOGOUT });
    setUser(null);
  };

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex text-center min-w-[300px] min-h-[170px] p-3 items-stretch">
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : user ? (
        <div className="flex flex-col justify-between w-full">
          <div className="w-full flex justify-center font-semibold text-lg">
            110x 🚀
          </div>
          <div>
            Logged As: <span className="font-semibold">{user.name}</span>
          </div>
          <a
            href={BASE_URL + '/login'}
            target="_blank"
            className="text-blue-500 hover:text-blue-800"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            Logout
          </a>
        </div>
      ) : (
        <Login getUser={getUser} />
      )}
    </div>
  );
}
