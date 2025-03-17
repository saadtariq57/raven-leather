import Banner from "@/components/landingPage/Banner";
import CategorySection from "@/components/landingPage/CategorySection";
import NewArrivals from "@/components/landingPage/NewArrivals";
import { getNewArrivals } from "@/lib/newArrivals";


export default async function Homepage() {
  let newArrivals = [];

  try {
    // Fetch data on the server
    newArrivals = await getNewArrivals();
  } catch (error) {
    console.error("Failed to fetch new arrivals:", error);
  }

  return (
    <div className="min-h-screen mx-auto space-y-12">
      <Banner />

      <NewArrivals newArrivals={newArrivals} />

      <CategorySection />
    </div>
  );
}

export const revalidate = 1800; // ISR: Revalidate every 30 minutes
