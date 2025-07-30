import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";
import { ProductData } from './products/product-data';
import { Product } from './products/product.model';

export class AppData implements InMemoryDbService {
    createDb(): { products: Product[] } {
        return { products: ProductData.products };
    }
}