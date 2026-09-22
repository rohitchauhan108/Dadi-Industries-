import { ProductDetailPage as ProductDetailPageComponent } from '@/src/components/ProductDetailPage';
import { PRODUCTS } from '@/src/data/products';

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: product.id }));
}

export default function ProductDetailPage() {
  return <ProductDetailPageComponent />;
}
