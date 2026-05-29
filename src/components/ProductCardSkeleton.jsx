import { Skeleton } from '@/components/ui/skeleton'

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden flex flex-col">
      <Skeleton className="h-56 w-full rounded-none" />
      <div className="p-4 flex flex-col gap-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-12 mt-2" />
        <div className="flex justify-between items-center mt-1">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-8 w-16 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export default ProductCardSkeleton