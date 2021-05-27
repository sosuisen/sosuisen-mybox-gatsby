# Demonstration of Continuous Deployment using GitDocumentDB

[GitDocumentDB](https://github.com/sosuisen/git-documentdb) is an offline-first DocumentDB that syncs with Git. 

Using GitHub and GitDocumentDB is suitable for Continuous Deployment (CD). 

- **Electron App** named **[Inventory Manager](https://github.com/sosuisen/inventory-manager)** is an offline-first CRUD app.
  - It creates, reads, updates and deletes items in a local Git repository
  - The local Git repository is synchronizing with the source repository on GitHub.
- **Source repository** named [sosuisen-mybox](https://github.com/sosuisen/sosuisen-mybox) uses Webhook to start a site generator on Netlify.
- **Site generator repository** named [sosuisen-mybox-gatsby](https://github.com/sosuisen/sosuisen-mybox-gatsby) (exactly you are here) contains [Gatsby](https://www.gatsbyjs.com/) site generator.
  - The site generator repository has the source repository as a Git submodule.
  - Gatsby loads source JSON files by 'git submodule update --remote' command.
- Netlify is connected to the site generator repository by GitHub Apps.
  - GitHub Apps load site generator repository and run Gatsby when triggered by push.
- Generated Web site is https://sosuisen-mybox.netlify.app/
