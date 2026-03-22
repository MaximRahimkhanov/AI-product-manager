import clsx from 'clsx';
import style from './Loader.module.scss';

interface LoaderProps {
  className?: string;
}

export default function Loader({ className }: LoaderProps) {
  return <p className={clsx(style.pulse, className)}></p>;
}
