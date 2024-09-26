// eslint-disable-next-line react/prop-types
const Loading = ({ fadeOut }) => {
    return (
      <div
        className={`flex items-center justify-center min-h-screen bg-black text-white transition-all duration-500 ${fadeOut ? "opacity-85" : "opacity-100"}`}
      >
        <img className="w-64" src="https://static.vecteezy.com/system/resources/previews/019/956/195/non_2x/netflix-transparent-netflix-free-free-png.png" alt="" />
      </div>
    );
  };
  
  export default Loading;
  