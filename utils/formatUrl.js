// utils/formatUrl.js
// export const formatUrl = (url) => {
//     if (!url) return '';
export const formatUrl = (url) => {
    if (!url) return '';
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  };
