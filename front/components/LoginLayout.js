import Link from "next/link";
const LoginLayout = () => {
  return (
    <div>
      로그인 페이지
      <form>input button</form>
      <Link href="/signup">
        <a title="페이지이동">회원가입</a>
      </Link>
    </div>
  );
};

export default LoginLayout;
