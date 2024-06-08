import {
  Skeleton,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/common";
import Image from "next/image";
import { useState } from "react";
import DefaultImg from "@/assets/defaultImg.svg";

interface PokemonCardProps {
  name: string;
  img: string;
  loadMoreLoading: boolean;
}

export function PokemonCard({ name, img, loadMoreLoading }: PokemonCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Image
            height={0}
            width={0}
            sizes="100vw"
            className={`h-[80px] w-auto ${imageLoaded ? "opacity-100" : "opacity-0"} transition-all duration-500`}
            src={imageLoaded ? img : DefaultImg}
            alt=""
            onLoad={() => setImageLoaded(true)}
          />
          <h1>{name}</h1>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <Image
              height={0}
              width={0}
              sizes="100vw"
              className="h-[100px] w-[100px]"
              src={img}
              alt=""
            />
            <h1> {name}</h1>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
