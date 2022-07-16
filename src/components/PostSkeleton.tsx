const PostSkeleton = () => {
  return (
    <section className="p-6 rounded-lg flex bg-white mb-4 sm:mb-5">
      <div className="hidden sm:block mr-10 animate-pulse">
        <div className="w-12 h-10 bg-gray-1 rounded-lg" />
      </div>
      <section className="flex flex-col gap-4 flex-1 animate-pulse">
        <div className="h-8 bg-gray-1 w-full rounded-lg" />
        <div className="h-8 bg-gray-1 w-full rounded-lg" />
        <div className="w-20 h-7 rounded-lg bg-gray-1" />
        <div className="flex justify-between sm:hidden">
          <div className="w-16 h-7 bg-gray-1 rounded-lg" />
          <div className="flex items-center">
            <div className="w-9 h-7 bg-gray-1 rounded-lg" />
          </div>
        </div>
      </section>{" "}
      <div className="hidden sm:flex items-center ml-6 animate-pulse">
        <div className="w-9 h-7 bg-gray-1 rounded-lg" />
      </div>
    </section>
  );
};

export default PostSkeleton;
