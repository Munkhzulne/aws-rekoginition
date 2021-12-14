import { createContext, useEffect, useState } from "react";
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";

//
const poolData = {
  UserPoolId: "", // Your user pool id here
  ClientId: "", // Your client id here
};
const userPool: any = new CognitoUserPool(poolData);

type functionProps = {
  email: string;
  password: string;
};
type verifyProps = {
  code: string;
};
type authProps = {
  user: any;
  setUser: any;
  token: string;
  signUp: ({ email, password }: functionProps) => void;
  signIn: ({ email, password }: functionProps) => void;
  verifyUser: ({ code }: verifyProps) => void;
  logout: () => void;
};
export const AuthContext = createContext<authProps>({
  user: {},
  token: "",
  setUser: null,
  signIn: () => {},
  signUp: () => {},
  verifyUser: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [cognitoUser, setCognitoUser] = useState<any>({ Pool: userPool });
  const [user, setUser] = useState<any>({});
  const [token, setToken] = useState("");

  const signUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    userPool.signUp(email, password, null, null, (err: any, result: any) => {
      if (err) {
        throw err.message || JSON.stringify(err);
      }

      setCognitoUser(result.user);
      return;
    });
  };

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    var authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    const userInfo = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    return userInfo.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const tk = result.getIdToken().getJwtToken();
        setToken(tk);

        return tk;
      },

      onFailure: (err) => {
        throw err.message || JSON.stringify(err);
      },
    });
  };

  const verifyUser = ({ code }: { code: string }) => {
    if (cognitoUser)
      cognitoUser.confirmRegistration(code, true, (err: any, result: any) => {
        if (err) {
          throw err.message || JSON.stringify(err);
        }
        console.log("call result: " + result);
      });
  };

  const logout = async () => {
    try {
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser !== null) {
        await cognitoUser.signOut();
      }
      return;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setUser(userPool.getCurrentUser());
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, signIn, signUp, verifyUser, logout, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
