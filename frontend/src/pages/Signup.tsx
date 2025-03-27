
import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export default function Signup() {
  

  return (
    <div className="flex flex-col md:flex-row min-h-screen h-screen">
        <div className="w-full  md:w-1/2 flex items-center justify-center p-6">
        <Auth type="signup"/>
        </div>
      <div className="hidden md:flex w-1/2 bg-gray-200 h-screen items-center justify-center p-6">
        <Quote />
      </div>
    </div>
  );
}
