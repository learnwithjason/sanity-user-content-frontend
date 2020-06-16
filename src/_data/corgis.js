const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: 'bmygd0c7',
  dataset: 'production',
  useCdn: true,
});

async function loadCorgis() {
  const corgis = await client
    .fetch(
      `
        *[_type=="corgi"]{
          _id,
          suggestedNames,
          corgiImage{
            ...,
            asset->{
              creditLine,
              url
            }
          }
        }
      `
    )
    .catch((err) => console.error(err));

  console.log(JSON.stringify(corgis, null, 2));

  return corgis;
}

module.exports = loadCorgis;
