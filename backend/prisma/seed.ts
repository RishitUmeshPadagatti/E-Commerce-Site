import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const items = [
    // Electronics
    {
      name: "Wireless Headphones",
      description: "High-quality noise-canceling wireless headphones.",
      price: 199.99,
      category: "Electronics",
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Smart Watch",
      description: "Track your fitness and stay connected.",
      price: 249.50,
      category: "Electronics",
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Bluetooth Speaker",
      description: "Portable speaker with crystal clear sound.",
      price: 59.99,
      category: "Electronics",
      imageUrl: "https://images.unsplash.com/photo-1608358322686-353679c5ef2f?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Mechanical Keyboard",
      description: "Tactile and responsive for gaming and typing.",
      price: 120.00,
      category: "Electronics",
      imageUrl: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Gaming Mouse",
      description: "High precision mouse with RGB lighting.",
      price: 45.00,
      category: "Electronics",
      imageUrl: "https://images.unsplash.com/photo-1527698266440-12104e498b76?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "External Hard Drive",
      description: "2TB of portable storage for your files.",
      price: 89.99,
      category: "Electronics",
      imageUrl: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=800"
    },

    // Clothing
    {
      name: "Leather Jacket",
      description: "Classic black leather jacket for all seasons.",
      price: 150.00,
      category: "Clothing",
      imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Denim Jeans",
      description: "Comfortable and durable slim-fit jeans.",
      price: 65.00,
      category: "Clothing",
      imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Running Shoes",
      description: "Lightweight shoes designed for maximum performance.",
      price: 110.00,
      category: "Clothing",
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Cotton T-Shirt",
      description: "Soft and breathable everyday cotton tee.",
      price: 25.00,
      category: "Clothing",
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Summer Dress",
      description: "Light floral dress perfect for sunny days.",
      price: 45.00,
      category: "Clothing",
      imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Woolen Sweater",
      description: "Warm and cozy sweater for cold winters.",
      price: 80.00,
      category: "Clothing",
      imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a4bb4?auto=format&fit=crop&q=80&w=800"
    },

    // Home & Kitchen
    {
      name: "Coffee Maker",
      description: "Brew your favorite coffee at home in minutes.",
      price: 75.00,
      category: "Home",
      imageUrl: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Cast Iron Skillet",
      description: "Durable skillet for perfect searing and baking.",
      price: 40.00,
      category: "Home",
      imageUrl: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Blender",
      description: "Powerful blender for smoothies and soups.",
      price: 120.00,
      category: "Home",
      imageUrl: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Scented Candle",
      description: "Relaxing lavender scented soy candle.",
      price: 15.00,
      category: "Home",
      imageUrl: "https://images.unsplash.com/photo-1603007905991-65a396404b7c?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Throw Blanket",
      description: "Soft and decorative blanket for your couch.",
      price: 35.00,
      category: "Home",
      imageUrl: "https://images.unsplash.com/photo-1528459105426-b9548367069b?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Table Lamp",
      description: "Modern design lamp for your bedside or desk.",
      price: 55.00,
      category: "Home",
      imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed657f9971?auto=format&fit=crop&q=80&w=800"
    },

    // Books
    {
      name: "Mystery Novel",
      description: "A gripping thriller that will keep you guessing.",
      price: 12.99,
      category: "Books",
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Science Fiction Anthology",
      description: "Short stories from the edges of the universe.",
      price: 18.50,
      category: "Books",
      imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Cookbook",
      description: "Healthy recipes for busy weeknights.",
      price: 22.00,
      category: "Books",
      imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "History Book",
      description: "An in-depth look at ancient civilizations.",
      price: 25.00,
      category: "Books",
      imageUrl: "https://images.unsplash.com/photo-1491843351663-7c1362e74a4c?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Art Photography Book",
      description: "Stunning visual journey through modern architecture.",
      price: 45.00,
      category: "Books",
      imageUrl: "https://images.unsplash.com/photo-1543004218-ee141104975a?auto=format&fit=crop&q=80&w=800"
    },

    // Sports & Outdoors
    {
      name: "Yoga Mat",
      description: "Non-slip mat for yoga and pilates.",
      price: 30.00,
      category: "Sports",
      imageUrl: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Dumbbells Set",
      description: "Adjustable weights for home strength training.",
      price: 85.00,
      category: "Sports",
      imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2adfcd?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Backpack",
      description: "Durable and waterproof for hiking and travel.",
      price: 70.00,
      category: "Sports",
      imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Water Bottle",
      description: "Insulated stainless steel bottle for long-lasting cold drinks.",
      price: 24.00,
      category: "Sports",
      imageUrl: "https://images.unsplash.com/photo-1602143301015-829d2f62804f?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Resistance Bands",
      description: "Set of 5 bands for various intensity levels.",
      price: 15.00,
      category: "Sports",
      imageUrl: "https://images.unsplash.com/photo-1598283109113-228cd0467ed3?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Tennis Racket",
      description: "Professional grade racket for enhanced control.",
      price: 130.00,
      category: "Sports",
      imageUrl: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Camping Tent",
      description: "Spacious 4-person tent for weekend adventures.",
      price: 180.00,
      category: "Sports",
      imageUrl: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800"
    }
  ]

  console.log('Seeding items...')
  for (const item of items) {
    await prisma.item.create({
      data: item
    })
  }
  console.log('Successfully seeded 30 items.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
