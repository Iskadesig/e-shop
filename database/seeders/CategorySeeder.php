<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::insert([
            ['name' => 'Electronics', 'description' => 'Electronic devices and gadgets.'],
            ['name' => 'Books', 'description' => 'Books and literature.'],
            ['name' => 'Clothing', 'description' => 'Apparel and accessories.'],
            ['name' => 'Home', 'description' => 'Home and kitchen products.'],
        ]);
    }
} 