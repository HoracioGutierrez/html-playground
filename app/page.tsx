import DndDashboard from "@/components/DndDashboard";

export default async function Home() {
  return (
    <>
      <h2 className="text-4xl text-center font-bold mb-3 text-accent">Drag n&apos; Drop elements to the DOM!</h2>
      <p className="text-center text-accent opacity-60 mb-10">This playground was created with the intention of having a tool for beginners to better learn </p>
      <DndDashboard />
    </>
  );
}
