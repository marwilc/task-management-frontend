import Image from "next/image";



export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-4xl font-bold font-bold mb-4">
          Hola 👋, soy MIRI tu AI Assistant y te ayudare a gestionar tus tareas.
        </h1>

      </main>
    </div>
  );
}
