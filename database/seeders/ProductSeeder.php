<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use App\Models\Subcategory;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $smartphones = Subcategory::where('name', 'Smartphones')->first();
        $laptops = Subcategory::where('name', 'Laptops')->first();
        $fiction = Subcategory::where('name', 'Fiction')->first();
        $nonfiction = Subcategory::where('name', 'Non-fiction')->first();
        $men = Subcategory::where('name', 'Men')->first();
        $women = Subcategory::where('name', 'Women')->first();
        $kitchen = Subcategory::where('name', 'Kitchen')->first();
        $furniture = Subcategory::where('name', 'Furniture')->first();

        Product::insert([
            [
                'name' => 'iPhone 15',
                'description' => 'Latest Apple smartphone.',
                'price' => 999.99,
                'image' => 'https://via.placeholder.com/300x300?text=iPhone+15',
                'stock' => 10,
                'category_id' => $smartphones->category_id,
                'subcategory_id' => $smartphones->id,
            ],
            [
                'name' => 'Dell XPS 13',
                'description' => '13-inch high-end laptop.',
                'price' => 1299.99,
                'image' => 'https://via.placeholder.com/300x300?text=Dell+XPS+13',
                'stock' => 7,
                'category_id' => $laptops->category_id,
                'subcategory_id' => $laptops->id,
            ],
            [
                'name' => 'The Great Gatsby',
                'description' => 'Classic fiction novel.',
                'price' => 14.99,
                'image' => 'https://via.placeholder.com/300x300?text=The+Great+Gatsby',
                'stock' => 20,
                'category_id' => $fiction->category_id,
                'subcategory_id' => $fiction->id,
            ],
            [
                'name' => 'Sapiens',
                'description' => 'A Brief History of Humankind.',
                'price' => 19.99,
                'image' => 'https://via.placeholder.com/300x300?text=Sapiens',
                'stock' => 15,
                'category_id' => $nonfiction->category_id,
                'subcategory_id' => $nonfiction->id,
            ],
            [
                'name' => 'Men T-Shirt',
                'description' => 'Cotton t-shirt for men.',
                'price' => 9.99,
                'image' => 'https://via.placeholder.com/300x300?text=Men+T-Shirt',
                'stock' => 30,
                'category_id' => $men->category_id,
                'subcategory_id' => $men->id,
            ],
            [
                'name' => 'Women Dress',
                'description' => 'Elegant dress for women.',
                'price' => 39.99,
                'image' => 'https://via.placeholder.com/300x300?text=Women+Dress',
                'stock' => 12,
                'category_id' => $women->category_id,
                'subcategory_id' => $women->id,
            ],
            [
                'name' => 'Blender',
                'description' => 'Kitchen blender appliance.',
                'price' => 49.99,
                'image' => 'https://via.placeholder.com/300x300?text=Blender',
                'stock' => 8,
                'category_id' => $kitchen->category_id,
                'subcategory_id' => $kitchen->id,
            ],
            [
                'name' => 'Sofa',
                'description' => 'Comfortable living room sofa.',
                'price' => 499.99,
                'image' => 'https://via.placeholder.com/300x300?text=Sofa',
                'stock' => 5,
                'category_id' => $furniture->category_id,
                'subcategory_id' => $furniture->id,
            ],
        ]);
    }
} 