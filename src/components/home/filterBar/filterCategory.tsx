import { useFilterContext } from "@/contexts/filterContext"
import { Category } from "../../../../types"
import { ChangeEvent, useState } from "react"

export default function FilterCategory() {
  const { categories, setSelectedCategoryId } = useFilterContext()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleSelected = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId)
    setSelectedCategoryId(categoryId)
  }
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const selectedCategoryId = e.target.value;
    setSelectedCategoryId(selectedCategoryId);
}

  return (
    <>
      <ul className="lg:flex hidden items-center justify-start gap-6 pb-6 ">
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
      <div className=" mb-6 h-6 flex lg:hidden justify-end">
            <select onChange={handleChange} className=" outline-none" name="category">
              <option value={""}>todos os produtos</option>
              {categories.category.map((category: Category) => (
              <option key={category._id} value={category._id}>{category.nomeCategoria}</option>
            ))}
            </select>
        </div>
    </>
  )
}
