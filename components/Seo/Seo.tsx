import { NextSeo } from "next-seo";

interface SeoProps {
  title: string;
  canonical: string;
  description: string;
  url: string;
  siteName?: string;
  handle_twiiter?: string;
  twitter_card_type?: string;
  twitter_site?: string;
  noindex?: boolean;
  image: string;
}

const Seo = ({
  title,
  canonical,
  description,
  url,
  siteName,
  handle_twiiter,
  twitter_card_type = "summary_large_image",
  twitter_site,
  noindex = false,
  image
}: SeoProps) => {
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={canonical}
      noindex={noindex}
      openGraph={{
        url,
        title,
        description,
        images: [{ url: image }],
        siteName
      }}
      twitter={{
        handle: handle_twiiter,
        site: twitter_site,
        cardType: twitter_card_type
      }}
    />
  );
};

export default Seo;
