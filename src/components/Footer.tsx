import { BsGithub, BsLinkedin, BsTwitterX } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className='mt-auto rounded-2xl border border-border/60 bg-card/60 px-4 py-3 backdrop-blur'>
      <div className='flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground'>
        <p>
          Made by <span className='text-foreground'>Yash Sakre</span>
        </p>

        <div className='flex items-center gap-3 text-lg'>
          <a
            href='https://github.com/Yash-Sakre'
            className='transition-colors hover:text-foreground'
            target='_blank'
            rel='noreferrer'
          >
            <BsGithub />
          </a>
          <a
            href='https://x.com/YashSakre4'
            className='transition-colors hover:text-foreground'
            target='_blank'
            rel='noreferrer'
          >
            <BsTwitterX />
          </a>
          <a
            href='https://www.linkedin.com/in/yash-sakre/'
            className='transition-colors hover:text-foreground'
            target='_blank'
            rel='noreferrer'
          >
            <BsLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
