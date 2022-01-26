import Link from "next/link";
import Image from "next/image";
import ExpandableCard from "./ExpandableCard";

const CustomLink = (props) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{props.children}</a>
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const BlogImg = (props) => {
  return (
    <div className="my-2">
      <Image
        src={props.src}
        alt={props.alt}
        layout="responsive"
        {...props}
        className="rounded-xl dark:brightness-95"
      />
      <figcaption>{props.caption}</figcaption>
    </div>
  );
};

const MDXComponent = {
  Image,
  a: CustomLink,
  BlogImg,
  ExpandableCard,
};

export default MDXComponent;
