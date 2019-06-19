export default cache => {
  Object.keys(cache.data.data).forEach(
    key => key.match(/^Dialog/) && cache.data.delete(key)
  );
};
