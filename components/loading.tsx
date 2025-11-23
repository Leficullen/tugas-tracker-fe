export default function loading() {
  return (
    // <div className="p-6 animate-pulse">
    //   <div className="h-6 w-48 bg-gray-300 rounded mb-4" />
    //   <div className="h-8 w-full bg-gray-300 rounded mb-3" />
    //   <div className="h-8 w-full bg-gray-300 rounded mb-3" />
    //   <div className="h-8 w-full bg-gray-300 rounded mb-3" />
    // </div>
    <div className="items-center justify-center fixed inset-0 flex flex-col bg-background/70  z-100">
      <img
        src="assets/Ruby Hello.png"
        alt=""
        className="w-[150px] animate-pulse"
      />
      <h1 className="text-primary h3 font-semibold">Loading...</h1>
    </div>
  );
}
