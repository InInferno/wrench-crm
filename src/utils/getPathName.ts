export const getPathName = (data: string[]) => {
  if (data.length >= 3) {
    let baseName = '';
    data.forEach((item, index) => {
      if (index !== data.length - 1 && index) {
        baseName += `/${item}`;
      }
    });
    return baseName;
  }
  return undefined;
};
