export const getModeParameter = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("mode");
};
