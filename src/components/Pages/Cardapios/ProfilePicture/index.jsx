import { AspectRatio } from "@/components/ui/aspect-ratio";
import logo from "../../../../assets/SideBar/image.png";

export default function ProfilePicture() {
  return (
    <>
      <div className="relative w-40 h-40 mx-auto">
        <div
          className="relative w-full h-full rounded-full flex justify-center items-center border-2 border-[#12101D]"
        >
          <AspectRatio ratio={1 / 1}>
            <img
              src={logo}
              alt="Selected"
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </div>
      </div >
    </>
  )
}