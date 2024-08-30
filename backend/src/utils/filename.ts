
export const generateFilename = (name: string, originalFilename: string) => {
  const formattedName = encodeS3URI(name.toLowerCase().replace(/\s+/g, '-'));
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

export const encodeS3URI = (filename: string) => {
  const encodings: any = {
    '\+': "%2B",
    '\!': "%21",
    '\"': "%22",
    '\#': "%2523",
    '\$': "%24",
    '\&': "%26",
    '\'': "%27",
    '\(': "%28",
    '\)': "%29",
    '\*': "%2A",
    '\,': "%2C",
    '\:': "%3A",
    '\;': "%3B",
    '\=': "%3D",
    '\?': "%3F",
    '\@': "%40",
  };
  return encodeURI(filename).replace(
    /(\+|!|"|#|\$|&|'|\(|\)|\*|\+|,|:|;|=|\?|@)/img,
    function(match) { return encodings[match]; });
}


export const extractFilename = (url: String) => {
  const filename = url.split('/');
  const name = filename[filename.length-1]
  return name;
}