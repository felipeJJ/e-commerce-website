import { useEffect, useState } from "react";
import { useFilterContext } from "@/contexts/filterContext";
import { useOrganizerContext } from "@/contexts/organizerContext";

export default function Pagination() {
  const { page, setPage } = useFilterContext();
  const { productCount } = useOrganizerContext();
  const [buttons, setButtons] = useState<number[]>([]);

  useEffect(() => {
    const newButtons = Array.from({ length: productCount }, (_, index) => index + 1);
    setButtons(newButtons);
  }, [productCount]);

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePrevPage() {
    setPage(page - 1);
  }

  function handleNumPages(index: number) {
    if (index >= 0 && index < productCount) {
      setPage(index + 1);
    }
  }

  return (
    <div className="uppercase h-8 flex justify-end 2xl:mr-9">
      {buttons.map((index) => (
        <button
          key={index}
          onClick={() => handleNumPages(index - 1)}
          className={`h-8 w-8 bg-gray-50 rounded-md mr-[2px] ${
            index === page ? "bg-gray-300" : ""
          }`}
        >
          {index}
        </button>
      ))}
      <button
        onClick={handlePrevPage}
        disabled={page === 1}
        className="h-8 w-8 bg-gray-50 rounded-md ml-1"
      >
        {"<"}
      </button>
      <button
        onClick={handleNextPage}
        disabled={page === productCount}
        className="h-8 w-8 bg-gray-50 rounded-md ml-[2px]"
      >
        {">"}
      </button>
    </div>
  );
}
