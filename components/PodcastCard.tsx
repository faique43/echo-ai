import Image from "next/image";
import React from "react";

const PodcastCard = ({
  podcast
}: {
  podcast: {
    id: number;
    imgURL: string;
    title: string;
    description: string;
  };
}) => {
  return (
    <div key={podcast.id} className="cursor-pointer">
      <figure className="flex flex-col gap-2">
        <Image
          src={podcast.imgURL}
          alt={podcast.title}
          width={174}
          height={174}
          className="aspect-square h-fit w-full rounded-xl 2xl:size-[200px]"
        />
        <div className="flex flex-col">
          <h1 className="text-16 truncate font-bold text-white-1">
            {podcast.title}
          </h1>
          <h2 className="text-12 truncate font-normal capitalize text-white-4">
            {podcast.description}
          </h2>
        </div>
      </figure>
    </div>
  );
};

export default PodcastCard;
