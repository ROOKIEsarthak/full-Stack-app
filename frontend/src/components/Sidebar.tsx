export default function Sidebar() {
  return (
    <div className="flex flex-col items-center justify-center mt-10 w-[15vw] ml-10 bg-[#161C23] rounded-lg">
      <div className="flex flex-col justify-start py-20 h-full gap-10">
        <div className="border-b border-[#1E2328] w-full">SideBar</div>
        <div className="border-b border-[#1E2328] w-full focus:text-[#E2C19D]"></div>
      </div>
      <button className="bg-[#4B3C2B] p-10 rounded-xl flex items-center justify-center w-full">
        Support
      </button>
    </div>
  );
}
