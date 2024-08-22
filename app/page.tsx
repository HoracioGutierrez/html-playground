import DndPlayground from "@/components/DndPlayground";

export default async function Home() {
  return (
    <>
      <h2 className="mb-3 font-bold text-accent text-center text-fluid-xl">
        Drag n&apos; Drop &nbsp;
        <span className="text-muted">elements to the DOM!</span>
      </h2>
      <p className="opacity-60 mb-20 text-accent text-center text-fluid-md">This playground was created with the intention of having a tool for beginners to better learn </p>
      <DndPlayground />
    </>
  );
}
