import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";

export const initializeCropper = (imgRef, setBlob) => {
  const cropper = new Cropper(imgRef, {
    zoomable: false,
    scalable: false,
    aspectRatio: 16 / 9,
    center: false,
    crop: () => {
      cropper.getCroppedCanvas().toBlob((blob) => {
        setBlob(blob);
      });
    },
    guides: true,
  });
};
