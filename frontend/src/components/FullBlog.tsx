
import { AppBar } from './AppBar';
import { Blog } from '../hooks';



export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-12 p-4 gap-6 w-full max-w-screen-lg pt-12">
          <div className="md:col-span-8">
            <div className="text-3xl sm:text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">
              Posted on {new Date(blog.publishedAt).toDateString().slice(4)}
            </div>
            
            <div className='flex flex-wrap gap-2'>

            {blog.tags?.slice(0, 3).map((tag, index) => (
                <span key={index} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md capitalize">
                            {tag}
                        </span>
                    ))}
            </div>
            
          <div className="pt-4 text-justify">{blog.content} </div>

          </div>
          <div className="md:col-span-4 mt-6 md:mt-0">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar name={blog.author.name || 'Anonymous'} />
              </div>
              <div>
                <div className="text-xl font-bold">{blog.author.name || 'Anonymous'}</div>
                <div className="pt-2 text-slate-500">
                  Crafting stories that captivate and inspire.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Avatar = ({ name }: { name: string }) => {
  return (
    <div
      className="relative inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-600"
      aria-label="Author avatar"
    >
      <span className="text-gray-300 text-base font-medium capitalize">{name[0] || '?'}</span>
    </div>
  );
};