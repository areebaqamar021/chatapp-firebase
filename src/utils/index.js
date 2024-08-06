export const findCommonChatId = (currentChatIds, targetChatIds) => {
  const commonChatId = Array.from(currentChatIds.docs).find((doc) => {
    const exists = Array.from(targetChatIds.docs).some((_doc) => {
      return _doc.data().chatRomId === doc.data().chatRomId;
    });

    if (exists) {
      return true;
    }

    return false;
  });

  return commonChatId?.data()?.chatRomId;
};

export const resizeImage = async (file, maxWidth, maxHeight) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        file.type,
        0.5
      );
    };

    img.onerror = (error) => {
      reject(error);
    };

    img.src = URL.createObjectURL(file);
  });
};
