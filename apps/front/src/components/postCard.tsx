import { Post } from "@/lib/types/modelTypes";
import Image from "next/image";
import Link from "next/link";

type Props = Partial<Post>;
const PostCard = ({ id, title, content, thumbnail, createdAt }: Props) => {
  const slugify = (title: string) => {
    return title
      .toLowerCase() // Chuyển thành chữ thường
      .trim() // Xoá khoảng trắng đầu cuối
      .normalize("NFD") // Chuẩn hoá ký tự có dấu thành dạng cơ bản
      .replace(/[\u0300-\u036f]/g, "") // Xoá dấu
      .replace(/[^a-z0-9\s-]/g, "") // Xoá ký tự đặc biệt
      .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu gạch ngang
      .replace(/-+/g, "-"); // Xoá dấu gạch ngang thừa
  };
  const isInvalidImage = !thumbnail || thumbnail.includes("undefined");
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="relative h-60 overflow-hidden">
        <Image
          src={isInvalidImage ? "/no-image.png" : thumbnail}
          alt={title || ""}
          sizes="(max-width: 768px) 100vw, 325px"
          style={{ objectFit: "cover" }}
          fill
        />
      </div>
      <div className="p-6 flex-grow flex flex-col ">
        <h3 className="text-lg font-bold mt-4 break-words text-center text-gray-600">
          {title}
        </h3>
        <p className="mt-2 text-gray-500 text-sm">
          {new Date(createdAt ?? "").toLocaleDateString()}
        </p>
        <p className="mt-4 text-gray-700 break-words">
          {content?.slice(0, 100)}...
        </p>
        <Link
          className="text-indigo-600 hover:underline mt-auto block"
          href={`/blog/${slugify(title!)}/${id}`}
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
