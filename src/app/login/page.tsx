"use client";

import AuthForm from "@/Components/Auth/auth_form";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bg-deepest">
      <AuthForm isModal={false} />
    </div>
  );
}