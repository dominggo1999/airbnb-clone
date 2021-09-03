import tw from 'twin.macro';
import { createClient } from 'contentful';
import { useEffect, useState } from 'react';
import Image from 'next/image';

// Connect to contentful
const client = createClient({
  space: process.env.NEXT_PUBLIC_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
});

const Review = ({ review }) => {
  const { rating, reviewDescription, traveller } = review.fields;

  const [travellerInfo, setTravellerInfo] = useState({
    name: '',
    image: '',
  });

  const getTravellerInformation = async (id) => {
    const { items } = await client.getEntries({
      content_type: 'person',
      'sys.id': id,
    });

    const traveller = items[0].fields;

    setTravellerInfo({
      ...travellerInfo,
      name: traveller.name,
      image: traveller.image.fields.file.url,
    });
  };

  useEffect(() => {
    getTravellerInformation(traveller.sys.id);
  }, []);

  return (
    <div tw="bg-white p-2 mb-3">
      <div tw="flex">
        <div tw="w-20 p-4 relative">
          {
            travellerInfo.image
            && (
            <Image
              layout="fill"
              objectFit="cover"
              src={`https:${travellerInfo.image}`}
            />
            )
          }
        </div>
        <div tw="px-3">
          <p tw="text-2xl font-bold">{rating} stars</p>
          <p tw="mt-2 text-red-600 font-semibold">{travellerInfo.name}</p>
          <p tw="italic">{reviewDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
