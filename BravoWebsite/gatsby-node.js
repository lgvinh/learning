const { resolve } = require('path');
const path = require('path');
const glob = require('glob');
const chunk = require('lodash/chunk');
const { dd } = require('dumper.js');

const getTemplates = () => {
  const sitePath = path.resolve('./');
  return glob.sync('./src/templates/**/*.js', { cwd: sitePath });
};

//
// @todo move this to gatsby-theme-wordpress
exports.createPages = async ({ actions, graphql }) => {
  const templates = getTemplates();

  const {
    data: {
      allWpContentNode: { nodes: contentNodes }
    }
  } = await graphql(/* GraphQL */ `
    query ALL_CONTENT_NODES {
      allWpContentNode(
        sort: { fields: modifiedGmt, order: DESC }
        filter: { nodeType: { ne: "MediaItem" } }
      ) {
        nodes {
          nodeType
          uri
          id
          modifiedGmt
        }
      }
    }
  `);

  const contentTypeTemplateDirectory = './src/templates/single/';
  const contentTypeTemplates = templates.filter((template) => template.includes(contentTypeTemplateDirectory));

  await Promise.all(
    contentNodes.map(async (node, i) => {
      const {
        nodeType, uri, id, modifiedGmt
      } = node;
      // this is a super super basic template hierarchy
      // this doesn't reflect what our hierarchy will look like.
      // this is for testing/demo purposes
      const templatePath = `${contentTypeTemplateDirectory}${nodeType}.js`;

      const contentTypeTemplate = contentTypeTemplates.find(
        (template) => template === templatePath
      );

      if (!contentTypeTemplate) {
        return;
      }

      await actions.createPage({
        component: resolve(contentTypeTemplate),
        path: uri,
        context: {
          id,
          nextPage: (contentNodes[i + 1] || {}).id,
          previousPage: (contentNodes[i - 1] || {}).id,
          modifiedGmt
        }
      });
    })
  );

  // create the homepage
  const {
    data: {
      allWpPost: {
        nodes
      }
    }
  } = await graphql(/* GraphQL */ `
    {
      allWpPost(sort: { fields: modifiedGmt, order: DESC }) {
        nodes {
          uri
          id
          modifiedGmt
        }
      }
    }
  `);

  const perPage = 10;
  const chunkedContentNodes = chunk(nodes, perPage);

  await Promise.all(
    chunkedContentNodes.map(async (nodesChunk, index) => {
      const firstNode = nodesChunk[0];
      const page = index + 1;
      const offset = perPage * index;

      await actions.createPage({
        component: resolve('./src/templates/index.js'),
        path: page === 1 ? '/blog/' : `/blog/${page}/`,
        context: {
          firstId: firstNode.id,
          page,
          offset,
          totalPages: chunkedContentNodes.length,
          perPage,
          modifiedGmt: nodesChunk.modifiedGmt
        }
      });
    })
  );
};
