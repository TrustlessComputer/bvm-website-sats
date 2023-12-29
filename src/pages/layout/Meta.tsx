import { Helmet } from 'react-helmet';

export const META_TITLE = 'Bitcoin Virtual Machine';
export const META_DESCRIPTION = 'Effortlessly create and manage your own Bitcoin Layer 2 network.';
export const META_SUB_DESCRIPTION = 'Set up your fully operational Bitcoin Layer 2 network with just a single click.';

const Meta = () => {
  return (
    <Helmet>
      <title>{META_TITLE}</title>
      <meta property="og:title" content={META_TITLE} />
      <meta property="og:description" content={META_DESCRIPTION} />
      <meta property="og:image" content="https://cdn.newbitcoincity.com/pages/city/metadata-city.png" />
      <meta property="og:type" content="website" />
      <meta property="twitter:title" content={META_TITLE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={META_DESCRIPTION} />
      <meta name="twitter:image" content="https://cdn.newbitcoincity.com/pages/city/metadata-city.png" />
    </Helmet>
  );
};

export default Meta;
