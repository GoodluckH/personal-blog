import Link from 'next/link'
import Image from 'next/image'
import ExpandableCard from './ExpandableCard'

const CustomLink = (props) => {
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{props.children}</a>
      </Link>
    )
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

const BlogImg = (props) => {
  return (
    <figure className="my-8">
      <Image
        src={props.src}
        alt={props.alt}
        layout="responsive"
        {...props}
      />
      {props.caption && <figcaption>{props.caption}</figcaption>}
    </figure>
  )
}

const MDXComponent = {
  Image,
  a: CustomLink,
  BlogImg,
  ExpandableCard,
}

export default MDXComponent
