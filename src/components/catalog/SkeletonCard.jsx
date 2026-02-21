export default function SkeletonCard() {
  return (
    <div className='rounded-2xl overflow-hidden bg-white border border-gray-100 animate-pulse'>
      {/* Image placeholder */}
      <div className='w-full aspect-4/3 bg-gray-200' />
      {/* Content */}
      <div className='p-5 space-y-3'>
        <div className='flex gap-2'>
          <div className='h-5 w-20 rounded-full bg-gray-200' />
          <div className='h-5 w-14 rounded-full bg-gray-200' />
        </div>
        <div className='h-5 w-3/4 rounded-lg bg-gray-200' />
        <div className='h-4 w-full rounded-lg bg-gray-200' />
        <div className='h-4 w-2/3 rounded-lg bg-gray-200' />
        <div className='flex items-center justify-between pt-2'>
          <div className='h-6 w-24 rounded-lg bg-gray-200' />
          <div className='h-9 w-24 rounded-xl bg-gray-200' />
        </div>
      </div>
    </div>
  );
}
