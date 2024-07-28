
export const generateFilename = (name: string, originalFilename: string) => {
  const formattedName = name.toLowerCase().replace(/\s+/g, '-');
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const timeString = `${hours}${minutes}${seconds}`;
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = String(now.getFullYear()).slice(2);
  const dateString = `${day}${month}${year}`;
  const extension = originalFilename.split('.').pop();
  const fileName = `${formattedName}-${dateString}-${timeString}.${extension}`;
  return fileName;
}

export const extractFilename = (url: String) => {
  const filename = url.split('/');
  const name = filename[filename.length-1]
  return name;
}