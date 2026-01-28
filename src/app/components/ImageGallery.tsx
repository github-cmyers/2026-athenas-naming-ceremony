"use client";

import { useState } from "react";
import Image from "next/image";

const dummyImages = [
  { id: 1, src: "https://picsum.photos/seed/ceremony1/400/300", alt: "Ceremony decoration" },
  { id: 2, src: "https://picsum.photos/seed/ceremony2/400/300", alt: "Celebration setup" },
  { id: 3, src: "https://picsum.photos/seed/ceremony3/400/300", alt: "Flowers" },
  { id: 4, src: "https://picsum.photos/seed/ceremony4/400/300", alt: "Family gathering" },
  { id: 5, src: "https://picsum.photos/seed/ceremony5/400/300", alt: "Gifts" },
  { id: 6, src: "https://picsum.photos/seed/ceremony6/400/300", alt: "Decorations" },
];

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<typeof dummyImages[0] | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {dummyImages.map((image) => (
          <div
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full aspect-[4/3]">
            <Image
              src={selectedImage.src.replace("400/300", "800/600")}
              alt={selectedImage.alt}
              fill
              className="object-contain rounded-xl"
              unoptimized
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white text-2xl transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
