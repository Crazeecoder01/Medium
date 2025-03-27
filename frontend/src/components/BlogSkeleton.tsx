export const BlogSkeleton = () => {
    return (
        <div className="border-b border-gray-200 p-4 w-full max-w-4xl mx-auto animate-pulse">
            {/* Author Section */}
            <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full"></div>
                <div className="flex flex-col gap-1">
                    <div className="w-24 h-4 bg-gray-200 rounded"></div>
                    <div className="w-16 h-3 bg-gray-200 rounded"></div>
                </div>
            </div>
            
            {/* Content Section */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
                {/* Text Section */}
                <div className="flex flex-col w-full md:w-[65%] space-y-2">
                    <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
                    <div className="w-full h-4 bg-gray-200 rounded"></div>
                    <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
                </div>
                
                {/* Image Placeholder */}
                <div className="w-full md:w-[30%] h-[120px] md:h-[140px] bg-gray-200 rounded-lg"></div>
            </div>
            
            {/* Footer Section */}
            <div className="flex justify-between items-center mt-3">
                <div className="flex flex-wrap gap-2">
                    <div className="w-12 h-5 bg-gray-200 rounded"></div>
                    <div className="w-14 h-5 bg-gray-200 rounded"></div>
                    <div className="w-10 h-5 bg-gray-200 rounded"></div>
                    <div className="w-16 h-5 bg-gray-200 rounded"></div>
                </div>
                <div className="w-12 h-4 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
};
