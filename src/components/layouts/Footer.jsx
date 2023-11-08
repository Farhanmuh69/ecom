import { Typography } from "@material-tailwind/react";
 
export function Footer() {
  return (
    <footer className="w-full bg-blue-600 p-8">
      <div className="flex flex-row  flex-wrap items-center justify-center bg-white text-center md:justify-between">
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="white" className="text-white text-center font-normal">
        &copy; 2023 Kelompok 3
      </Typography>
    </footer>
  );
}