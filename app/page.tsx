import DndDashboard from "@/components/DndDashboard";

export default async function Home() {
  return (
    <>
      <h2 className="text-4xl text-center font-bold opacity-70 mb-20">Drag n' Drop elements to the DOM!</h2>
      <p>This playground was created with the intention of having a tool for beginners to better learn </p>
      <DndDashboard />
    </>
  );
}
