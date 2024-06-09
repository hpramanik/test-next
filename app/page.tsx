import { DarkThemeToggle } from "flowbite-react";
import { type ReactElement } from "react";
import { Editor } from "./design-system/auto.grid";

const Home = (): ReactElement => {
  return (
    <main className="flex min-h-screen gap-2 dark:bg-gray-800 w-full">
      <div className="flex gap-2">
        <div className="grow-0">
          <Editor />
        </div>
        <div className="grow justify-center items-center">
          <h1 className="text-2xl dark:text-white">Flowbite React + Next.js</h1>
          <DarkThemeToggle />
        </div>
      </div>
    </main>
  );
};

export default Home;
