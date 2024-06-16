import { BiLogoTelegram } from 'react-icons/bi';
import { BsGithub } from 'react-icons/bs';

const AboutPage = () => {
  return (
    <div className='m-auto flex h-[90%] w-[90%] flex-col gap-7 py-10 font-mono text-lg'>
      <div className='flex flex-col gap-3'>
        <h1 className='text-3xl font-bold'>About TypeArena</h1>
        <p className=''>
          TypeArena is an innovative platform designed to enhance your typing skills. Built with
          React and TailwindCSS, this app draws inspiration from{' '}
          <a
            href='http://www.monkeytype.com'
            target='_blank'
            className='font-bold hover:underline'
          >
            MonkeyType
          </a>
          . Our goal is to provide a seamless and engaging experience for users looking to test
          and improve their typing speed and accuracy through a sleek, minimalistic interface.
        </p>
      </div>
      <div className='flex flex-col gap-3 mb-5'>
        <h2 className='text-2xl font-bold'>Features</h2>
        <ul className='space-y-2 list-none list-inside'>
          <li>
            <strong className='italic'>Typing Challenges</strong>: Engage in various typing
            challenges that help measure and improve your typing speed and accuracy. The challenges
            include diverse sentences and paragraphs, with results displayed in words per minute
            (WPM).
          </li>
          <li>
            <strong className='italic'>Customizable Durations</strong>: Choose from different
            typing test durations such as 15 seconds, 30 seconds, or 60 seconds to suit your
            practice needs.
          </li>
          <li>
            <strong className='italic'>Performance Metrics</strong>: Track detailed statistics
            including WPM/CPM, accuracy percentage, error rate, and total characters typed to
            monitor your progress.
          </li>
          <li>
            <strong className='italic'>Typing History</strong>: Review your past typing sessions
            and analyze your performance trends over time.
          </li>
          <li>
            <strong className='italic'>Adaptive Design</strong>: Enjoy a responsive interface that
            adapts to different screen sizes, ensuring a consistent experience across various
            devices.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
