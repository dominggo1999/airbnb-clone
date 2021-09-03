import Link from 'next/link';
import Image from 'next/image';
import tw, { styled } from 'twin.macro';

const CardImageContainer = styled.div`
  ${tw`
    relative
  `}
  width: 100%;
  height: 200px;
`;

const PropertyCard = ({ fields }) => {
  const {
    title, slug, mainImage, propertyType,
  } = fields;

  return (
    <div tw="w-80 bg-red-600 text-white p-5 m-5">
      <CardImageContainer>
        <Image
          layout="fill"
          objectFit="cover"
          src={`https:${mainImage.fields.file.url}`}
        />
      </CardImageContainer>
      <h1>{title}</h1>
      <p tw="mt-3">{propertyType}</p>
      <Link href={`/property/${slug}`}>
        <a
          href={`/property/${slug}`}
          tw="cursor-pointer text-black mt-5"
        >Detail
        </a>
      </Link>
    </div>
  );
};

export default PropertyCard;
