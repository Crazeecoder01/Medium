import React from 'react';
import { AppBar } from './AppBar';

export const FullBlogSkeleton = () => {
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-12 p-4 gap-6 w-full max-w-screen-lg pt-12">
          {/* Main content skeleton */}
          <div className="md:col-span-8 space-y-4">
            {/* Title skeleton */}
            <div className="h-12 bg-gray-200 rounded-full w-3/4 animate-pulse"></div>
            
            {/* Date skeleton */}
            <div className="h-4 bg-gray-200 rounded-full w-1/3 animate-pulse"></div>
            
            {/* Tags skeleton */}
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
              ))}
            </div>
            
            {/* Content skeleton */}
            <div className="space-y-3 pt-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded-full animate-pulse" style={{ width: `${100 - (i * 5)}%` }}></div>
              ))}
              <div className="h-4 bg-gray-200 rounded-full w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-full w-1/2 animate-pulse"></div>
            </div>
          </div>
          
          {/* Author sidebar skeleton */}
          <div className="md:col-span-4 mt-6 md:mt-0">
            <div className="h-6 bg-gray-200 rounded-full w-1/4 animate-pulse mb-4"></div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded-full w-1/2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-full w-3/4 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};