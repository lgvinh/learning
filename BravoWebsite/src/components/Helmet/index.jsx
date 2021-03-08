import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { getImageType } from '../../utils/getImageType';

const HelmetComponent = ({
  title, description, image: metaImage, meta
}) => {
  const {
    site: {
      siteMetadata: {
        description: siteMetaDescription,
        author,
        keywords,
        siteUrl
      }
    }
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            description
            author
            keywords
            siteUrl
          }
        }
      }
    `
  );

  const metaDescription = description || siteMetaDescription;
  const image = metaImage && metaImage.src
    ? `${siteUrl}${metaImage.src}`
    : null;

  return (
    <Helmet
      title={title}
      meta={[
        {
          name: 'description',
          content: metaDescription
        },
        {
          name: 'keywords',
          content: keywords?.join(',')
        },
        {
          property: 'og:title',
          content: title
        },
        {
          property: 'og:description',
          content: metaDescription
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:url',
          content: siteUrl
        },
        {
          name: 'twitter:creator',
          content: author
        },
        {
          name: 'twitter:title',
          content: title
        },
        {
          name: 'twitter:description',
          content: metaDescription
        }
      ]
        .concat(
          metaImage
            ? [
              {
                property: 'twitter:image',
                content: image
              },
              {
                property: 'og:image',
                content: image
              },
              {
                property: 'og:image:secure_url',
                content: image
              },
              {
                property: 'og:image:type',
                content: getImageType(metaImage.src)
              },
              {
                property: 'og:image:width',
                content: metaImage.width
              },
              {
                property: 'og:image:height',
                content: metaImage.height
              },
              {
                property: 'og:image:alt',
                content: title
              },
              {
                name: 'twitter:card',
                content: 'summary_large_image'
              }
            ]
            : [
              {
                name: 'twitter:card',
                content: 'summary'
              }
            ]
        )
        .concat(meta)}
    />
  );
};

HelmetComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  meta: PropTypes.arrayOf(Object),
  image: PropTypes.shape({
    src: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
  })
};

HelmetComponent.defaultProps = {
  description: '',
  meta: [],
  image: undefined
};

export default HelmetComponent;