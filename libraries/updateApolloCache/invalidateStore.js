export default cache => {
  Object.keys(cache.data.data).forEach(key => cache.data.delete(key));
};
