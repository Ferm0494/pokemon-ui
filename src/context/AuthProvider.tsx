import { useRouter } from "next/router";
import React, {
  createContext,
  useState,
  useEffect,
  ReactChildren,
  ReactNode,
  useCallback,
} from "react";

interface User {
  name: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (name: string) => void;
}

interface AuthProps extends Pick<AuthContextProps, "user"> {
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  login: () => {},
});

const AuthProvider: React.FC<{ children: (props: AuthProps) => ReactNode }> = ({
  children,
}) => {
//   const navigator = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = (name: string) => {
    setUser({ name });
    sessionStorage.setItem("user", JSON.stringify({ name }));
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({ name: parsedUser.name });
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, loading }}>
      {children({
        user,
        loading,
      })}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
