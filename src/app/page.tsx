import SignupForm from "@/components/layout/forms/SignupForm";

export default function Home() {
  return (
    <main className="min-h-screen py-8">
      <section className="max-w-2xl w-full mx-auto px-4">
        <SignupForm />
      </section>
    </main>
  );
}
