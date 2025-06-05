<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Subcategory;

class SubcategorySeeder extends Seeder
{
    public function run(): void
    {
        $electronics = Category::where('name', 'Electronics')->first();
        $books = Category::where('name', 'Books')->first();
        $clothing = Category::where('name', 'Clothing')->first();
        $home = Category::where('name', 'Home')->first();

        Subcategory::insert([
            ['name' => 'Smartphones', 'description' => 'Mobile phones and accessories.', 'category_id' => $electronics->id],
            ['name' => 'Laptops', 'description' => 'Portable computers.', 'category_id' => $electronics->id],
            ['name' => 'Fiction', 'description' => 'Fictional books.', 'category_id' => $books->id],
            ['name' => 'Non-fiction', 'description' => 'Non-fictional books.', 'category_id' => $books->id],
            ['name' => 'Men', 'description' => 'Men clothing.', 'category_id' => $clothing->id],
            ['name' => 'Women', 'description' => 'Women clothing.', 'category_id' => $clothing->id],
            ['name' => 'Kitchen', 'description' => 'Kitchen appliances.', 'category_id' => $home->id],
            ['name' => 'Furniture', 'description' => 'Home furniture.', 'category_id' => $home->id],
        ]);
    }
} 