import DesktopNavbar from "@/components/desktopNavbar";
import MobileNavbar from "@/components/mobileNavbar";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren;
export default function NavbarContainer(props: Props) {
  return (
    <div className="relative">
      <DesktopNavbar>{props.children}</DesktopNavbar>
      <MobileNavbar>{props.children}</MobileNavbar>
    </div>
  );
}
