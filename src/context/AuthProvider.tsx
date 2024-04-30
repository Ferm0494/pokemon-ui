import React, {
    createContext,
    useState,
    useEffect,
    ReactNode,
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
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
  
    const login = (name: string) => {
      setUser({ name });
      sessionStorage.setItem("user", JSON.stringify({ name }));
    };
  
    const logout = () => {
      setUser(null);
      sessionStorage.removeItem("user");
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
        {user && (
          <button
          onClick={logout}
          className="absolute top-2 right-2 text-blue-500 px-4 py-2 rounded hover:underline"
        >
          Log out
        </button>
        )}
        {children({
          user,
          loading,
        })}
      </AuthContext.Provider>
    );
  };
  
  export default AuthProvider;