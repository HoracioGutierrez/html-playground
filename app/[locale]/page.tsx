import DndPlayground from "@/components/DndPlayground";
import PageDescription from "@/components/layout/PageDescription";
import PageTitle from "@/components/layout/PageTitle";

function HomePage() {
  
  return (
    <>
      <PageTitle/>
      <PageDescription/>
      <DndPlayground />
    </>
  );
}

export default HomePage;