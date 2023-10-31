import { useFilterContext } from "@/contexts/filterContext";
import { Category } from "../../../../types";
import { useState } from "react";

export default function FilterCategory() {
  const { categories, setSelectedCategoryId } = useFilterContext();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelected = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    setSelectedCategoryId(categoryId);
  }

  return (
    <ul className="flex items-center justify-start gap-6 pb-6">
        <button 
            className={`uppercase ${
                selectedCategory === 'all_products' ? 'font-semibold border-b-4 border-[#FFA585]' : ''
              }`}
            onClick={() => handleSelected('all_products')}
        >
            Todos os produtos
        </button>
        {categories.category.map((category: Category) => (
        <button
          onClick={() => handleSelected(category._id)}
          className={`uppercase ${
            selectedCategory === category._id ? 'font-semibold border-b-4 border-[#FFA585]' : ''
          }`}
          key={category._id}
        >
          {category.nomeCategoria}
        </button>
      ))}
    </ul>
  );
}
