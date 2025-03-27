import React from 'react';
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
            <div className="pt-4 text-justify">{blog.content} Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dicta error commodi id aperiam aspernatur dolor incidunt similique atque possimus quasi delectus sapiente at suscipit iusto necessitatibus recusandae quod, dolore tempore. Soluta itaque quia obcaecati, id vitae nulla perspiciatis alias deleniti iste unde corrupti nesciunt? Error sapiente earum, unde omnis expedita architecto reiciendis vel dicta, reprehenderit cupiditate dolorum eligendi ducimus eum voluptatem distinctio nulla exercitationem amet hic placeat inventore velit debitis fugiat? Qui in veniam vel accusamus minus rem quos libero itaque consequuntur architecto! Odit sit accusantium iste quos, facere eum et aliquam blanditiis aut commodi voluptatibus ullam vero, voluptas repellat sequi libero exercitationem, maiores consectetur. Quas aut, debitis eaque beatae velit saepe adipisci tenetur similique animi, consequuntur magnam ipsum a eligendi quis necessitatibus inventore quaerat et aliquam fuga aliquid. Laboriosam id repellat quas illum veniam perferendis enim aliquid fugit autem vel, repudiandae praesentium eaque blanditiis delectus ea reiciendis voluptate commodi maiores illo, natus accusamus libero obcaecati? Eligendi et nemo numquam tempora molestiae nihil asperiores aliquam rerum atque? Nostrum fugit dolores architecto numquam culpa dolorum esse magni perferendis ipsam deserunt, quam cupiditate error nemo doloremque pariatur voluptate molestiae recusandae? Qui ipsa ducimus eaque ab sequi saepe neque reprehenderit architecto, similique quod nemo consequatur non obcaecati iusto? Delectus a odit at, voluptate tempore doloremque labore quisquam inventore. Iste id autem nemo commodi molestias hic sapiente. Quae animi facere unde iure molestias sapiente obcaecati ipsum, voluptas voluptatem libero velit asperiores tempore! Ducimus perspiciatis explicabo doloribus voluptas dolores quod nihil repellendus, velit accusantium dolor vel. Blanditiis minima inventore quo iusto animi earum fugit soluta harum officiis, sint voluptatum in nisi esse quidem aperiam a voluptatem amet deleniti ea ducimus aliquam voluptate dolor alias placeat. Omnis earum reprehenderit facilis amet quae? Deleniti corrupti maxime, veritatis officiis maiores quis ipsam aut dolore incidunt, nostrum neque.</div>
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