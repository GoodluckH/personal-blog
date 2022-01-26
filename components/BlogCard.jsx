import Image from "next/image";
import Link from "next/link";

const BlogCard = (data) => {
  return (
    <div className="flex flex-col p-3 space-y-5 bg-white shadow-lg rounded-xl">
      <div className="overflow-hidden rounded-xl">
        <Image
          src={data.image}
          width={800}
          height={533}
          layout="responsive"
          alt="cover image"
        />
      </div>

      <div className="flex flex-col space-y-3">
        <Link href={`/blogs/${data.slug}`}>
          <a className="cursor-pointer">
            <h5 className="text-lg font-black text-gray-800">{data.title}</h5>
          </a>
        </Link>
        <p className="text-sm text-gray-500">{data.summary}</p>
        <div className="flex space-x-2 text-xs text-purple-500">
          {data.tags.map((tag) => (
            <span className="px-2 py-1 bg-gray-100 rounded-full" key={tag}>
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
