import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { ScreenContainer } from ".";
import { Button, Input, Text } from "../components";
import { AuthContext } from "../provider/authContext";

export const SignIn = () => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();

  const submit = async () => {
    try {
      const res = await signIn({ email, password });
      console.log(res);
      navigation("/");
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  return (
    <ScreenContainer className="flex-col">
      <Text fontSize="32">Sign in</Text>
      <Input
        placeholder="Email"
        fontSize="24"
        className="pv-14 ph-30 mb-20 mt-20"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        fontSize="24"
        className="pv-14 ph-30 mb-20"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
      />
      <Button className="pv-14 ph-30" onClick={submit}>
        <Text fontSize="24">Log in</Text>
      </Button>

      <div className="flex align-center mt-10">
        <Text fontSize="24">Don't have account?</Text>
        <Button
          className="pv-14 ph-30"
          type="text"
          onClick={() => navigation("/signup")}
        >
          <Text fontSize="24" color="primary">
            sign up
          </Text>
        </Button>
      </div>
    </ScreenContainer>
  );
};
