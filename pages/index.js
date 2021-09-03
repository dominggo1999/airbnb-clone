import tw, { styled } from 'twin.macro';
import { createClient } from 'contentful';
import PropertyCard from '../components/PropertyCard';

const Container = styled.div`
  ${tw`
     flex flex-col p-20 justify-center items-center
  `}
`;

const index = ({ properties }) => {
  if(!properties) {
    return <h1>No property found</h1>;
  }

  return (
    <Container>
      {
        properties.map((item) => {
          return (
            <PropertyCard
              key={item.sys.id}
              fields={item.fields}
            />
          );
        })
      }
    </Container>
  );
};

export default index;

export async function getStaticProps() {
  // Connect to contentful
  const client = createClient({
    space: process.env.NEXT_PUBLIC_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({
    content_type: 'property',
  });

  if(res.items.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      properties: res.items,
    },
    revalidate: 10,
  };
}
