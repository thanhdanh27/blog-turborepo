import Sidebar from "@/components/sidebar";
import { Bars3Icon } from "@heroicons/react/16/solid";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren;
export default function MobileNavbar(props: Props) {
  return (
    <div className="md:hidden">
      <Sidebar
        triggerIcon={<Bars3Icon className="w-4" />}
        triggerClassName="absolute top-2 left-2"
      >
        {props.children}
      </Sidebar>
    </div>
  );
}
