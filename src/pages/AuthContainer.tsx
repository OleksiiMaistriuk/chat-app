import { LoginPage } from "pages/LoginPage";
import { RegisterPage } from "pages/RegisterPage";
import { useState } from "react";

export const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="m-auto " style={{ maxWidth: "500px" }}>
      {isLogin ? (
        <RegisterPage onSetIsLogin={() => setIsLogin(!isLogin)} />
      ) : (
        <LoginPage onSetIsLogin={() => setIsLogin(!isLogin)} />
      )}
    </div>
  );
};
