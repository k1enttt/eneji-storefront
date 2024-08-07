const CloseButton = ({
  className,
  onClick,
}: {
  className?: string
  onClick?: (e: any) => any
}) => {
  return (
    <div
      className={`absolute top-5 left-5 w-9 h-9 p-2 rounded-circle bg-black bg-opacity-50 flex items-center justify-center cursor-pointer ${className}`}
      onClick={onClick}
    >
      <i className="fas fa-times text-xl text-white"></i>
    </div>
  )
}

export default CloseButton