import { useState } from "react";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="m-auto " style={{ maxWidth: "500px" }}>
      {/* {isLogin ? (
        <LoginPage onSetIsLogin={() => setIsLogin(!isLogin)} />
      ) : (
        <RegisterPage onSetIsLogin={() => setIsLogin(!isLogin)} />
      )} */}
    </div>
  );
};
