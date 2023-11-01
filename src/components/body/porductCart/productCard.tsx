import { Products } from "../../../../types"
import Image from "next/image"
import Line from "./lineDivider"
import { Saira } from 'next/font/google'
import { useFilterContext } from "@/contexts/filterContext"
import { useOrganizerContext } from "@/contexts/organizerContext"
import { useEffect } from "react"
import CartIcon from "./cartIcon"
import ButtonCart from "./buttonCart"

const saira = Saira({
    subsets: ['latin'],
    weight:['300', '600'],
    variable: '--font-saira',
})

interface ProductCardProps {
    products: Products[]
  }

export default function ProductCard({ products }: ProductCardProps) {
    const { selectedCategoryId, page, search } = useFilterContext()
    const { organizer, itemsPerPage, setProductCount } = useOrganizerContext()
    
    const filteredProducts = selectedCategoryId === "all_products"
    ? products.filter(product => product.nome.toLowerCase().includes(search.toLowerCase()))
    : products.filter(product => 
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
            const totalItems = products.length
            setProductCount(Math.ceil(totalItems / itemsPerPage))
        } else{
            const totalItems = currentItems.length
            setProductCount(Math.ceil(totalItems / itemsPerPage))
        }
    }, [currentItems.length, itemsPerPage, organizer, products.length, search, selectedCategoryId, setProductCount])

    useEffect(()=>{
        console.log(search)
    },[search])
    return(
        <>
            {currentItems.map((product) => (
                <section key={product._id} className="w-64 h-[410px] shadow-lg">
                    <div className="w-64 h-[300px] relative boder-2 border-red-300">
                        <Image
                            fill
                            src={product.imagens[1]}
                            alt="Product image"
                            style={{objectFit: "contain"}}
                            sizes="(max-width: 300px) 100vw"
                        />
                    </div>
                    <div className={`${saira.variable} font-serif w-64 absolute`}>
                        <div className=" flex justify-center mt-1">
                            <Line/>
                        </div>
                        <p className={`my-2 mx-3 font-light`}>
                            {product.nome}
                        </p>
                        <div className=" flex justify-center">
                            <Line/>
                        </div>
                        <div className={`flex justify-between h-14 w-64 ${product.nome.length < 29 ? 'mt-3' : ''} `}>
                            <p className="my-2 mx-3 font-semibold">
                                {`R$ ${product.preco},00`}
                            </p>
                            <ButtonCart/>
                        </div>
                    </div>

                </section>
            ))}
        </>
    )
}