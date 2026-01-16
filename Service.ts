
import { MenuData, MenuItem } from "./types";

/**
 * A comprehensive static menu for Divyansh Restaurant.
 * Each item contains a unique AI image prompt for 3D realistic cinematic rendering
 * and a high-quality Unsplash image for immediate visual appeal.
 */
const MENU_ITEMS_COLLECTION: MenuItem[] = [
  // --- STARTERS ---
  {
    id: "s1",
    category: "Starters",
    name: "Paneer Tikka",
    price: "180",
    imagePrompt: "3D realistic Paneer Tikka, charred edges, cubes of marinated cottage cheese, bell peppers, and onions on a skewer, cinematic lighting, dark restaurant background, premium plating with fresh mint chutney, high detail, soft shadows.",
    imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c175f0?q=80&w=800&auto=format&fit=crop"
  } as any,
  {
    id: "s2",
    category: "Starters",
    name: "Hara Bhara Kabab",
    price: "160",
    imagePrompt: "3D realistic Hara Bhara Kabab, vibrant green spinach and pea patties with a golden crust, served on a dark slate platter, garnish of ginger juliennes, cinematic lighting, dark background, soft shadows, premium presentation.",
    imageUrl: "https://images.unsplash.com/photo-1601050638917-3d873bc73390?q=80&w=800&auto=format&fit=crop"
  } as any,
  {
    id: "s3",
    category: "Starters",
    name: "Chilli Mushroom",
    price: "170",
    imagePrompt: "3D realistic Chilli Mushroom, crispy stir-fried mushrooms with colorful peppers and spring onions, glossy soy glaze, dark ceramic bowl, dramatic steam, cinematic lighting, high detail, premium presentation.",
    imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=800&auto=format&fit=crop"
  } as any,
  {
    id: "s4",
    category: "Starters",
    name: "Veg Seekh Kabab",
    price: "150",
    imagePrompt: "3D realistic Veg Seekh Kabab, long cylindrical minced vegetable skewers, visible spices and herbs, smoky texture, served with lemon wedges on a long white plate, cinematic dark lighting, high detail.",
    imageUrl: "https://images.unsplash.com/photo-1603360946369-dc9bb0d588bb?q=80&w=800&auto=format&fit=crop"
  } as any,
  {
    id: "s5",
    category: "Starters",
    name: "Crispy Corn",
    price: "140",
    imagePrompt: "3D realistic Crispy Corn, golden fried kernels with a dusting of peri-peri spice and spring onions, served in a wooden bowl, sharp focus, cinematic soft lighting, dark restaurant background.",
    imageUrl: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=800&auto=format&fit=crop"
  } as any,

  // --- MAIN COURSE ---
  {
    id: "m1",
    category: "Main Course",
    name: "Paneer Butter Masala",
    price: "220",
    imagePrompt: "3D realistic Paneer Butter Masala, rich creamy orange tomato gravy, soft paneer cubes, swirl of fresh white cream, garnish of coriander, dark fine-dining background, cinematic lighting, high detail.",
    imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800&auto=format&fit=crop"
  } as any,
  {
    id: "m2",
    category: "Main Course",
    name: "Kadhai Paneer",
    price: "210",
    imagePrompt: "3D realistic Kadhai Paneer, thick spiced gravy with diced bell peppers and onions, served in a traditional iron kadhai, rustic premium presentation, dramatic lighting, high detail, soft shadows.",
    imageUrl: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800&auto=format&fit=crop"
  } as any,
  {
    id: "m3",
    category: "Main Course",
    name: "Dal Makhani",
    price: "190",
    imagePrompt: "3D realistic Dal Makhani, slow-cooked black lentils in creamy dark gravy, melting knob of white butter, served in a black porcelain bowl, steam rising, cinematic lighting, premium detail.",
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop"
  } as any,
  {
    id: "m4",
    category: "Main Course",
    name: "Mixed Veg Curry",
    price: "170",
    imagePrompt: "3D realistic Mixed Veg Curry, vibrant carrots, beans, and peas in a spiced golden-brown gravy, served in a copper handi, cinematic restaurant setting, soft shadows, high detail.",
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop"
  } as any,
  {
    id: "m5",
    category: "Main Course",
    name: "Jeera Rice",
    price: "110",
    imagePrompt: "3D realistic Jeera Rice, aromatic long-grain basmati rice with toasted cumin seeds and fresh cilantro, light and fluffy texture, served in a white porcelain dish, cinematic lighting.",
    imageUrl: "https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=800&auto=format&fit=crop"
  } as any,
  {
    id: "m6",
    category: "Main Course",
    name: "Butter Naan",
    price: "40",
    imagePrompt: "3D realistic Butter Naan, soft leavened flatbread with golden charred spots, glistening layer of melted butter, folded in a wicker basket, cinematic warm light, dark background.",
    imageUrl: "https://images.unsplash.com/photo-1601050638917-3d873bc73390?q=80&w=800&auto=format&fit=crop"
  } as any,
  {
    id: "m7",
    category: "Main Course",
    name: "Garlic Naan",
    price: "50",
    imagePrompt: "3D realistic Garlic Naan, flatbread topped with minced garlic and coriander, slightly crispy edges, glistening ghee, dark luxury restaurant backdrop, cinematic lighting, soft shadows.",
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop"
  } as any,
  {
    id: "m8",
    category: "Main Course",
    name: "Veg Pulao",
    price: "160",
    imagePrompt: "3D realistic Veg Pulao, fragrant basmati rice with whole spices, green peas, and carrots, garnished with fried onions, elegant white plate, cinematic lighting, premium high detail.",
    imageUrl: "https://images.unsplash.com/photo-1512058560566-d8413b609d06?q=80&w=800&auto=format&fit=crop"
  } as any,

  // --- FAST FOOD ---
  {
    id: "f1",
    category: "Fast Food",
    name: "Veg Cheese Burger",
    price: "120",
    imagePrompt: "3D realistic Veg Cheese Burger, thick patty, melting cheddar, crisp lettuce, tomato, toasted brioche bun, side of fries, macro photography, cinematic lighting, dark background.",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop"
  } as any,
  {
    id: "f2",
    category: "Fast Food",
    name: "Margherita Pizza (8\")",
    price: "250",
    imagePrompt: "3D realistic Margherita Pizza, thin crust, bubbling mozzarella, fresh tomato sauce dots, basil leaves, wooden pizza peel, cinematic lighting, high detail, premium presentation.",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop"
  } as any,
  {
    id: "f3",
    category: "Fast Food",
    name: "Veg Hakka Noodles",
    price: "140",
    imagePrompt: "3D realistic Veg Hakka Noodles, stir-fried noodles with julienned vegetables, spring onions, served in a deep bowl with chopsticks, rising steam, cinematic lighting, dark background.",
    imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop"
  } as any,
  {
    id: "f4",
    category: "Fast Food",
    name: "Veg Manchurian Dry",
    price: "150",
    imagePrompt: "3D realistic Veg Manchurian Dry, dark glazed vegetable balls, scattered garlic and ginger, intense sauce coating, modern square platter, cinematic lighting, high detail.",
    imageUrl: "https://images.unsplash.com/photo-1512058454905-6b841e7ad132?q=80&w=800&auto=format&fit=crop"
  } as any,
  {
    id: "f5",
    category: "Fast Food",
    name: "Paneer Grilled Sandwich",
    price: "110",
    imagePrompt: "3D realistic Paneer Grilled Sandwich, toasted bread with grill marks, paneer and vegetable filling, cheese pull, served on a wooden board, cinematic lighting, soft shadows.",
    imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=800&auto=format&fit=crop"
  } as any,
  {
    id: "f6",
    category: "Fast Food",
    name: "French Fries",
    price: "90",
    imagePrompt: "3D realistic French Fries, golden crispy potato sticks with sea salt, served in a metal basket, bokeh background of a dark bar, cinematic lighting, premium presentation.",
    imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop"
  } as any,

  // --- COLD DRINKS ---
  {
    id: "c1",
    category: "Cold Drinks",
    name: "Cold Coffee w/ Ice Cream",
    price: "120",
    imagePrompt: "3D realistic Cold Coffee, tall glass with layers of coffee and milk, vanilla ice cream scoop, chocolate syrup drizzle, moisture droplets, cinematic lighting, dark background.",
    imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop"
  } as any,
  {
    id: "c2",
    category: "Cold Drinks",
    name: "Virgin Mojito",
    price: "90",
    imagePrompt: "3D realistic Virgin Mojito, mint leaves and lime wedges in sparkling water, crushed ice, refreshing condensation, cinematic lighting, high detail, premium presentation.",
    imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop"
  } as any,
  {
    id: "c3",
    category: "Cold Drinks",
    name: "Oreo Shake",
    price: "110",
    imagePrompt: "3D realistic Oreo Shake, thick creamy shake with blended cookies, whipped cream peak, oreo sprinkles, chocolate straw, dark dramatic background, cinematic lighting.",
    imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop"
  } as any,
  {
    id: "c4",
    category: "Cold Drinks",
    name: "Mango Shake",
    price: "100",
    imagePrompt: "3D realistic Mango Shake, vibrant yellow thick shake, garnish of fresh mango chunks, tall elegant glass, cinematic lighting, high detail, premium presentation.",
    imageUrl: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?q=80&w=800&auto=format&fit=crop"
  } as any,
  {
    id: "c5",
    category: "Cold Drinks",
    name: "Fresh Lime Soda",
    price: "60",
    imagePrompt: "3D realistic Fresh Lime Soda, fizzy carbonated water with lime juice, floating lime slices and mint, salt rim, sparkling highlights, cinematic lighting, dark background.",
    imageUrl: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=800&auto=format&fit=crop"
  } as any,
  {
    id: "c6",
    category: "Cold Drinks",
    name: "Mineral Water (1L)",
    price: "20",
    imagePrompt: "3D realistic Mineral Water, sleek clear plastic bottle, premium label, crisp cold condensation, crystal clear water, served with glass, minimalist cinematic lighting.",
    imageUrl: "https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=800&auto=format&fit=crop"
  } as any,

  // --- DESSERTS ---
  {
    id: "d1",
    category: "Desserts",
    name: "Gulab Jamun (2pcs)",
    price: "60",
    imagePrompt: "3D realistic Gulab Jamun, deep-fried dough balls in rose sugar syrup, warm golden-brown, pistachio slivers, served in a silver bowl, cinematic lighting, high detail.",
    imageUrl: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?q=80&w=800&auto=format&fit=crop"
  } as any,
  {
    id: "d2",
    category: "Desserts",
    name: "Sizzling Brownie",
    price: "150",
    imagePrompt: "3D realistic Sizzling Brownie, hot brownie on cast iron sizzler, vanilla ice cream scoop, molten chocolate sauce, dense steam, cinematic lighting, dark background.",
    imageUrl: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800&auto=format&fit=crop"
  } as any,
  {
    id: "d3",
    category: "Desserts",
    name: "Vanilla Ice Cream",
    price: "50",
    imagePrompt: "3D realistic Vanilla Ice Cream, two round scoops, visible vanilla bean specks, served in a chilled glass bowl, cinematic lighting, soft shadows, premium high detail.",
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800&auto=format&fit=crop"
  } as any,
  {
    id: "d4",
    category: "Desserts",
    name: "Rasmalai (2pcs)",
    price: "80",
    imagePrompt: "3D realistic Rasmalai, soft cottage cheese patties in saffron milk, vibrant yellow color, garnish of nuts, elegant ceramic dish, cinematic lighting, premium presentation.",
    imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=800&auto=format&fit=crop"
  } as any
];

export function getDefaultMenu(): MenuData {
  const categoriesMap: Record<string, MenuItem[]> = {};
  
  MENU_ITEMS_COLLECTION.forEach(item => {
    if (!categoriesMap[item.category]) {
      categoriesMap[item.category] = [];
    }
    categoriesMap[item.category].push(item);
  });

  const categoryImages: Record<string, string> = {
    "Starters": "https://images.unsplash.com/photo-1599487488170-d11ec9c175f0?q=80&w=1000&auto=format&fit=crop",
    "Main Course": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1000&auto=format&fit=crop",
    "Fast Food": "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop",
    "Cold Drinks": "https://images.unsplash.com/photo-1544787210-282cb28b59ee?q=80&w=1000&auto=format&fit=crop",
    "Desserts": "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1000&auto=format&fit=crop"
  };

  return {
    restaurantName: "Divyansh Restaurant",
    categories: Object.keys(categoriesMap).map(catName => ({
      categoryName: catName,
      items: categoriesMap[catName],
      imageUrl: categoryImages[catName]
    }))
  };
}
