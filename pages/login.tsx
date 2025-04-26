import Layout from "@/components/layout/Layout";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <Layout title="Login">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Login to Your Account
        </h1>
        <LoginForm />
      </div>
    </Layout>
  );
}
