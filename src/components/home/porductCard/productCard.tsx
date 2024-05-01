import { Products } from "../../../../types"
import { useCartContext } from "@/contexts/cartContext"
import { useFilterContext } from "@/contexts/filterContext"
import { useOrganizerContext } from "@/contexts/organizerContext"
import { useEffect } from "react"
import Image from "next/image"
import ButtonCart from "./cartButton"
import Line from "./lineDivider"

export default function ProductCard() {
    const  { products } = useCartContext()
    const { selectedCategoryId, page, search } = useFilterContext()
    const { organizer, itemsPerPage, setProductCount } = useOrganizerContext()
    
    const prodctsArray: Products[] = products.produtos
    
    const filteredProducts = selectedCategoryId === "all_products"
    ? prodctsArray.filter(product => product.nome.toLowerCase().includes(search.toLowerCase()))
    : prodctsArray.filter(product => 
        product.categoria === selectedCategoryId && 
        product.nome.toLowerCase().includes(search.toLowerCase())
    )
  
    const sortedProducts = [...filteredProducts]
    
    const indexOfLastItem = page * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem)

    if (organizer === "bigest") {
        currentItems.sort((a, b) => b.preco - a.preco)
    } else if (organizer === "lowest") {
        currentItems.sort((a, b) => a.preco - b.preco)
    } else if (organizer === "newest") {
        currentItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
    
    useEffect(() => {
        if(selectedCategoryId === "all_products"){
            const totalItems = prodctsArray.length
            setProductCount(Math.ceil(totalItems / itemsPerPage))
        } else{
            const totalItems = currentItems.length
            setProductCount(Math.ceil(totalItems / itemsPerPage))
        }
    }, [currentItems.length, itemsPerPage, organizer, prodctsArray.length, search, selectedCategoryId, setProductCount])

    return(
        <>
            {currentItems.map((product) => (
                <section key={product._id} className="md:w-64 md:h-[410px] w-32 h-[230px] shadow-lg">
                    <div className="md:w-64 md:h-[300px] w-32 h-[150px] relative">
                        <Image
                            priority
                            fill
                            src={product.imagens[1]}
                            alt="Product image"
                            style={{objectFit: "contain"}}
                            sizes="(max-width: 300px) 100vw"
                        />
                    </div>
                    <div className="font-serif md:w-64 w-32 absolute md:text-base text-xs">
                        <div className=" flex justify-center md:mt-1 mt-0.5">
                            <Line/>
                        </div>
                        <p className={`md:my-2 md:mx-3 my-1 mx-1.5 font-light`}>
                            {product.nome}
                        </p>
                        <div className=" flex justify-center">
                            <Line/>
                        </div>
                        <div className={`flex justify-between md:h-14 md:w-64 h-7 w-32 ${product.nome.length < 29 ? 'md:mt-3 mt-1.5' : ''} `}>
                            <p className="md:my-2 md:mx-3 my-1 mx-1.5 font-semibold">
                                {`R$ ${product.preco},00`}
                            </p>
                            <ButtonCart productId={product._id}/>
                        </div>
                    </div>

                </section>
            ))}
        </>
    )
}