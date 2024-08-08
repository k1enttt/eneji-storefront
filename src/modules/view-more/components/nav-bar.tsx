import Link from "next/link"

const NavBar = ({
  className = "",
  title,
} : {
  className?: string
  title?: string
}) => {
  return (
    <div className={`relation w-full h-12 flex items-center justify-start ${className}`}>
      <Link href="/" className="absolute">
        <i className="fa-solid fa-arrow-left text-lg p-2"></i>
      </Link>
      {
        title && (
          <span className="text-base font-[500] w-full text-center">{title}</span>)
      }
    </div>
  )
}

export default NavBar
