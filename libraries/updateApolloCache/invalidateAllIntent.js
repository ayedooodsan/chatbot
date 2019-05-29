export default cache => {
  Object.keys(cache.data.data).forEach(
    key => key.match(/^Intent/) && cache.data.delete(key)
  );
};
