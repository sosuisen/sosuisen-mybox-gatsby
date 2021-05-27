module.exports = {
  siteMetadata: {
    title: "My Inventory Site",
  },
  plugins: [
    'gatsby-transformer-json',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'item',
        path: `${__dirname}/src/json/item/`,
      },
    },
    'gatsby-transformer-json',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'box',
        path: `${__dirname}/src/json/box/`,
      },
    },
  ],
};
