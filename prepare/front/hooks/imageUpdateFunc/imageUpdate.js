/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/prefer-default-export */

import imageCompression from 'browser-image-compression';

const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

export const imageUpdate = async (photoToAdd, temp, setImageLoading) => {
  for (let i = 0; i < photoToAdd.length; i++) {
    setImageLoading(true);
    if (photoToAdd[i].name.split('.')[1] === 'HEIC') {
      // eslint-disable-next-line global-require
      const heic2any = require('heic2any');
      await heic2any({
        blob: photoToAdd[i],
        toType: 'image/jpeg',
      })
        .then(async (result) => {
          const compressedFile = await imageCompression(result, options);
          const file = new File(
            [compressedFile],
            `${photoToAdd[i].name.split('.')[0]}.jpeg`,
            {
              type: 'image/jpeg',
              lastModified: new Date().getTime(),
            },
          );
          temp.push({
            id: file.name,
            file,
            url: URL.createObjectURL(file),
          });
        })
        .catch((error) => console.error(error));
    } else {
      const compressedFile = await imageCompression(photoToAdd[i], options);
      temp.push({
        id: compressedFile.name,
        file: compressedFile,
        url: URL.createObjectURL(compressedFile),
      });
    }
  }
  setImageLoading(false);
};
