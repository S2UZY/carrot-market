import TabBar from "@/components/tab-bar";
import { PropsWithChildren } from "react";

export default function TabLayout({ children }: PropsWithChildren) {
  return (
    <div className="pb-14">
      {children}
      <TabBar />
    </div>
  );
}
