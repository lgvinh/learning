export const normalizePath = (path) => {
  let newPath = path || '';

  if (!newPath.endsWith('/')) {
    newPath = `${newPath}/`;
  }

  if (!newPath.startsWith('/')) {
    newPath = `/${newPath}`;
  }

  return newPath;
};

export const getParentPath = (path) => {
  if (!path || typeof path !== 'string') {
    return '';
  }
  return path.split('/').splice(0, 2).join('/');
};
