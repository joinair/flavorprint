
export default ({ externalUrl, id }) =>
  externalUrl
    ? `/recipes/from-partners?url=${externalUrl}`
    : `/recipes/${id}`;
