import { ProductWithImagesAndSizes } from '@/types/client/product.types';
import { prisma } from '../../../../DB/db.config';
import Category from '@/components/category/Category';

export default async function JacketsPage() {
  // Fetch the initial 20 jacket products from the database
  const initialProducts = await prisma.product.findMany({
    where: { category: "jacket", status: true },
    take: 20,
    orderBy: { id: 'desc' },
    include: {
      images: true,
      sizes: true
    }
  });

  return (
    <div className="container max-w-6xl mx-auto px-4 min-h-screen">
      {/* Client component handles load-more functionality */}
      <Category initialProducts={initialProducts as ProductWithImagesAndSizes[]} category='jackets' categoryName='Jackets' />
    </div>
  );
}

export const revalidate = 1800; // ISR: Revalidate every 30 minutes