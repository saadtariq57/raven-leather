import ShowMoreSearched from '@/components/search/ShowMoreSearched';

export default async function Search({ searchParams }: { searchParams: { query: string} }) {
    const query = searchParams.query;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search?query=${query}`);
    const data = await res.json();
  
  return (
    <div className="container max-w-6xl mx-auto px-4 min-h-screen">
      <ShowMoreSearched products={data.searchResult} query={query} />
    </div>
  );
}
