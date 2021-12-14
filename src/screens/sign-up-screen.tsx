import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { ScreenContainer } from ".";
import { AuthContext } from "../provider/authContext";
import { Button, Input, Text, FileInput } from "../components";
import { getApiWithUser, uploadWithS3 } from "../api";

export const SignUp = () => {
  const [checkCode, setCheckCode] = useState(false);
  return checkCode ? (
    <CheckVerificationCode />
  ) : (
    <GetEmailAndPassword setCheckCode={setCheckCode} />
  );
};

const GetEmailAndPassword = ({ setCheckCode }: { setCheckCode: any }) => {
  const { signUp } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>(undefined);
  const navigation = useNavigate();

  const submit = async () => {
    try {
      await signUp({ email, password });
      const url = await getApiWithUser('/getPresignedUrl', {key: `faces/${selectedFile.name}`, type: selectedFile.type})
      const res = await uploadWithS3(url, selectedFile)
      console.log(res)
      setCheckCode(true);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <ScreenContainer className="flex">
      <div className="flex-col">
        <Text fontSize="32">Sign up</Text>
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
          <Text fontSize="24">Create</Text>
        </Button>

        <div className="flex align-center mt-10">
          <Text fontSize="24">Already have account?</Text>
          <Button
            className="pv-14 ph-30"
            type="text"
            onClick={() => navigation("/signin")}
          >
            <Text fontSize="24" color="primary">
              sign in
            </Text>
          </Button>
        </div>
      </div>
      <div className="ml-30">
        <FileInput
          onFileSelect={(file: any) => setSelectedFile(file)}
          label="Click to upload"
        />
      </div>
    </ScreenContainer>
  );
};

const CheckVerificationCode = () => {
  const { verifyUser } = useContext(AuthContext);
  const [code, setCode] = useState("");
  const navigation = useNavigate();

  const check = async () => {
    try {
      await verifyUser({ code });
      navigation("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <ScreenContainer className="flex-col">
      <Text fontSize="32">Verify email</Text>
      <Input
        placeholder="Code"
        fontSize="24"
        className="pv-14 ph-30 mb-20 mt-20"
        value={code}
        onChange={(e: any) => setCode(e.target.value)}
        type="text"
        maxLength={6}
        size={6}
      />
      <Button className="pv-14 ph-30" onClick={check}>
        <Text fontSize="24">Check</Text>
      </Button>
    </ScreenContainer>
  );
};
