import { ProductWithImagesAndSizes } from '@/types/client/product.types';
import { prisma } from '../../../../DB/db.config';
import Category from '@/components/category/Category';

export default async function BeltsPage() {
  // Fetch the initial 20 jacket products from the database
  let initialProducts = await prisma.product.findMany({
    where: { category: "belt", status: true },
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
      <Category initialProducts={initialProducts as ProductWithImagesAndSizes[]} category='belts' categoryName='Belts' />
    </div>
  );
}
