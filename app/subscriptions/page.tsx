import NavBar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
const Subscriptions = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }

  return <NavBar />;
};

export default Subscriptions;
