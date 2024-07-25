export default function TimeBlock({ time }: { time: string }) {
  const hours = time.split(":")[0]
  const minutes = time.split(":")[1]
  const seconds = time.split(":")[2]
  return (
    <div className="flex items-center">
      <div className="w-[1.5rem] h-[1.25rem] bg-gray-500 text-white flex items-center justify-center rounded-sm">
        {hours}
      </div>
      <span className="text-gray-500">:</span>
      <div className="w-[1.5rem] h-[1.25rem] bg-gray-500 text-white flex items-center justify-center rounded-sm">
        {minutes}
      </div>
      <span className="text-gray-500">:</span>
      <div className="w-[1.5rem] h-[1.25rem] bg-gray-500 text-white flex items-center justify-center rounded-sm">
        {seconds}
      </div>
    </div>
  )
}
