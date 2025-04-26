import Layout from "@/components/layout/Layout";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <Layout title="Sign Up">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Create an Account
        </h1>
        <SignupForm />
      </div>
    </Layout>
  );
}
