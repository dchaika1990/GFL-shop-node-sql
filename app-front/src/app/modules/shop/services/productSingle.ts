export interface ProductSingleInfo {
    id_product: number;
    product_name: string;
    product_description: string;
    image_name: string;
    product_price: number;
    structure_name: string;
    category_name: string;
    product_count: number;
    id_type: number;
    type_name: string;
}

export interface ProductSingleOptions {
    id_options: number;
    id_type: number;
    type_name: string;
    id_color: number;
    color_name: string;
    color_code: string;
    id_size: number;
    size_name: string;
}
