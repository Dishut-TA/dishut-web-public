import BG from "@/assets/images/BGMenanam.png";

const BackgroundImageSection = () => {
  return (
    <div className="w-full h-full bg-linear-to-t from-[#98C98A]/30 to-transparent">
        <img src={BG} />
    </div>
  )
}

export default BackgroundImageSection