import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";
import CodeViewer from "./CodeViewer";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  const formattedDate = new Date(blog.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "IST",
  });

  return (
    <div>
      <Appbar />{" "}
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
          <div className="md:col-span-8 col-span-12">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <CodeViewer content={blog.content} language="cpp" />
          </div>
          <div className="md:col-span-4 col-span-12 ml-10">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar size="big" name={blog.author.name || "Anonymous"} />
              </div>
              <div className="my-2">
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
              </div>
            </div>
            <div className="flex mt-4">
              <div className="md:text-lg text-sm pr-2">Created on : </div>
              <div className="text-slate-500 md:text-lg text-sm">{formattedDate}</div>
            </div>
            <div className="flex">
              <div className="md:text-lg text-sm pr-2">Language : </div>
              <div className="text-slate-500 md:text-lg text-sm">{blog.language}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
