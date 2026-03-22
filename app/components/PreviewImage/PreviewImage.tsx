import Image from 'next/image';
import style from './PreviewImage.module.scss';

interface PreviewImageProps {
  base64Image: string;
}

const PreviewImage = ({ base64Image }: PreviewImageProps) => {
  return (
    <div>
      <Image
        src={base64Image}
        alt="preview"
        className={style.preview}
        width={200}
        height={200}
        unoptimized
      />
    </div>
  );
};

export default PreviewImage;
