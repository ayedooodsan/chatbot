export default cache => {
  Object.keys(cache.data.data).forEach(
    key => key.match(/^Entity/) && cache.data.delete(key)
  );
};
