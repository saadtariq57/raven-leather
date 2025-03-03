import Banner from "@/components/landingPage/Banner";
import CategorySection from "@/components/landingPage/CategorySection";
import NewArrivals from "@/components/landingPage/NewArrivals";
import { getNewArrivals } from "@/lib/newArrivals";

export default async function Homepage() {
  // Fetch data on the server
  const newArrivals = await getNewArrivals();

  return (
    <div className="min-h-screen mx-auto space-y-12">
      <Banner />

      <NewArrivals newArrivals={newArrivals} />

      <CategorySection />
    </div>
  );
}
