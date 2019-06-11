export default cache => {
  Object.keys(cache.data.data).forEach(
    key => key.match(/^SearchResult/) && cache.data.delete(key)
  );
};
