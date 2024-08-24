import LoadingCircles from "../loading-spinner"

const LoadingPage = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white/50 backdrop-blur-sm z-50">
      <div className="w-full h-full flex items-center justify-center">
        <LoadingCircles size={60} />
      </div>
    </div>
  )
}

export default LoadingPage
