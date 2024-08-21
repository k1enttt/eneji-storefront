const MyAddresses = ({ className }: { className?: string }) => {
  return (
    <div className={className || ""}>
      <div className="flex-1">
        <div className="text-sm text-[#475467]">Địa chỉ</div>
        <div>2/29 Cao Thắng, Phường 05, Quận 3, TP.HCM</div>
      </div>
      <div className="flex-none text-base h-6 w-6 flex items-center justify-center">
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    </div>
  )
}

export default MyAddresses
