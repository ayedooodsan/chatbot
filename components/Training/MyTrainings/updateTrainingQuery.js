export default cache => {
  Object.keys(cache.data.data).forEach(
    key => key.match(/^Training/) && cache.data.delete(key)
  );
};
