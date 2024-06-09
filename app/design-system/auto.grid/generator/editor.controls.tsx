"use client";
import { Button, Sidebar } from "flowbite-react";
import type { ReactElement } from "react";
import { HiChartPie } from "react-icons/hi";

export const EditorControls = (): ReactElement => {
  return (
    <Sidebar aria-label="Auto Grid Editor Controls">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={HiChartPie}>
            <Button className="bg-transparent hover:bg-transparent text-black dark:bg-transparent dark:hover:bg-transparent dark:text-white">
              Add Cell
            </Button>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
