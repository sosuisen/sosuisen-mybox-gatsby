module.exports = {
  siteMetadata: {
    title: "My Inventory Site",
  },
  plugins: [
    'gatsby-transformer-json',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'items',
        path: `${__dirname}/src/json/`,
      },
    },
  ],
};
