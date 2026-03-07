'use client'
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { useMutation, useQuery } from "@tanstack/react-query"
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CldUploadWidget, CldImage } from 'next-cloudinary'
import { getStartupsWithoutImage, handleDeleteImage, uploadImage } from "@/app/actions/image-upload";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";
import Image from "next/image";
interface UploadImageProps {
  id: string;
  name: string;
}

export function UploadImage() {
  const [imageUrl, setImageUrl] = useState("");
  const [value, setValue] = useState("");
  const [publicId, setPublicId] = useState("");
  const { data: startupsList, refetch } = useQuery({
    queryKey: ['startups-without-image'],
    queryFn: () => getStartupsWithoutImage({ token: '' }),
    enabled: false,
    select: (data) => data?.startups || []
  })
  const { mutateAsync, isSuccess, isPending, isIdle } = useMutation({
    mutationKey: ["upload-image"],
    mutationFn: (variable: { image: string, startupId: string }) => uploadImage(variable),
    onSuccess: (data) => {
      if (data?.msg) {
        toast.success("Image is uploaded successfully")
      } else {
        toast.error("Image upload error")
      }

      setImageUrl("");
      setValue("");
    }
  });

  const upload = async () => {
    await mutateAsync({ startupId: value, image: imageUrl });
    refetch();
    setValue("");
    setImageUrl("");
    setPublicId("");
  }


  return (

    <div className="w-full flex flex-col justify-center items-center p-10 gap-4">
      <div className="flex flex-col gap-5">
        <h1 style={{ fontSize: '3rem' }} className="font-mono text-center">Upload Image for startups with no image </h1>
        <select name="s1" id="s1" value={value} className="w-full border-2 outline-0  p-3 rounded-lg " onChange={(e) => { setValue(e.target.value); console.log(e.target.value) }}>
          <option value="" disabled>
            -- Select a Startup --
          </option>
          {startupsList?.map((startup) => (
            <option key={startup.id} className="bg-black font-bold rounded-lg" value={`${startup.id}`} >{startup.name}</option>
          ))}

        </select>
        <CldUploadWidget uploadPreset="capstone" options={{ resourceType: 'image', showUploadMoreButton: false, singleUploadAutoClose: true, maxFileSize: 1024 * 1024 * 2 , cropping:true}} onSuccess={(result: any) => {
          setImageUrl(result.info.secure_url);
          setPublicId(result.info.public_id);
        }} onError={(error) =>
          console.log(error)
        }>

          {({ open }) => {
            return (
              <button onClick={() => {
                if (imageUrl !== "") {
                  handleDeleteImage(publicId);
                  setImageUrl("");
                  setPublicId("");

                }
                open();
              }} className=" bg-red-500 w-fit m-auto rounded-lg p-3 hover:cursor-pointer" disabled={isPending || isSuccess} >
                {!imageUrl && isIdle && "Pick the Image"}
                {isPending && "Uploading the Image......"}
                {imageUrl && isIdle && "Change Image"}
                {isSuccess && "Image Uploaded Successfully"}
              </button>
            );
          }}
        </CldUploadWidget>
      </div>


      {imageUrl && (
        <div>
          <p>Upload successful!</p>
        </div>
      )}
      <div className="flex gap-2">
        {value !== "" && (<Button variant="destructive" className="hover:cursor-pointer" onClick={() => {
          setImageUrl("");
          setValue("");
        }}>Reset</Button>)}
        {value && imageUrl && <Button variant="default" disabled={imageUrl === ""} onClick={() => {
          upload();
        }}>Submit for {startupsList?.find((startup) => startup.id === value)?.name} </Button>}
      </div>
    </div>
  )
}