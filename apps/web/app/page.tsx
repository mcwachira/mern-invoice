"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import "./homepage.css";

const Home = () => {
  const router = useRouter();
  return (
    <header className="bg-cover bg-center h-screen main-bg-image flex flex-col justify-center items-center px-4 text-center">
      <h1 className="text-[8rem] sm:text-[12rem] font-extrabold uppercase text-white leading-none">
        MERN Invoice
      </h1>

      <p className="text-white text-opacity-70 text-xl max-w-3xl mt-4">
        Whatever business you run, creating invoices, receipts, and quotations
        is made easy with our app.
      </p>

      <div className="mt-10">
        <Button
          variant="default"
          size="lg"
          className="text-2xl px-8 py-4 rounded-full bg-green-600 hover:bg-green-700"
          onClick={() => router.push("/auth/register")}
        >
          Create Account
        </Button>
      </div>
    </header>
  );
};

export default Home;
