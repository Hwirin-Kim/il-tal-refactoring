import { createContext, useContext, useEffect, useState } from "react";

interface IContext {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginCheckContext = createContext<IContext>({
  isLogin: false,
  setIsLogin: () => {},
});

interface LoginCheckProviderProps {
  children: React.ReactNode;
}
export const LoginCheckProvider: React.FC<LoginCheckProviderProps> = ({
  children,
}) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (sessionStorage.access_token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  return (
    <LoginCheckContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </LoginCheckContext.Provider>
  );
};

export const useLoginCheck = () => useContext(LoginCheckContext);
