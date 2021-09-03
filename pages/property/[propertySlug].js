import { createClient } from 'contentful';
import Link from 'next/link';
import Image from 'next/image';
import tw, { styled } from 'twin.macro';
import Review from '../../components/Review';

// Connect to contentful
const client = createClient({
  space: process.env.NEXT_PUBLIC_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
});

const CardImageContainer = styled.div`
  ${tw`
    relative
  `}
  width: 300px;
  height: 200px;
`;

const PropertyDetail = ({ property }) => {
  const {
    title, description, mainImage, reviews,
  } = property.fields;

  return (
    <div tw="flex flex-col p-5 bg-red-600 w-full min-h-screen">
      <Link href="/">
        <h1 tw="text-white text-5xl mb-5 cursor-pointer">Back to home</h1>
      </Link>
      <CardImageContainer>
        <Image
          layout="fill"
          objectFit="cover"
          src={`https:${mainImage.fields.file.url}`}
        />
      </CardImageContainer>
      <h1 tw="mb-5">{title}</h1>
      <p>{description}</p>
      <div tw="mt-5">
        {
          reviews.map((review) => {
            return (
              <Review
                key={review.sys.id}
                review={review}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default PropertyDetail;

export async function getStaticPaths(context) {
  const properties = await client.getEntries({
    content_type: 'property',
  });

  // Map properties ke path yang bentuknya slug
  const paths = properties.items.map((item) => {
    return {
      params: {
        propertySlug: item.fields.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  const property = await client.getEntries({
    content_type: 'property',
    'fields.slug': params.propertySlug,
  });

  // If no property is found
  if(property.items.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      property: property.items[0],
      revalidate: 10,
    },
  };
}
