import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AboutPage = () => {
  return (
    <div className='space-y-6'>
      <Card className='border-border/70 bg-background/50'>
        <CardHeader>
          <CardTitle className='font-serif text-2xl'>Typr</CardTitle>
        </CardHeader>
        <CardContent className='space-y-3 text-sm text-muted-foreground'>
          <p>
            Typr is a focused typing training app built with React and Tailwind.
            It is designed for short, repeatable sessions with immediate feedback.
          </p>
          <p>
            This version includes a redesigned typing arena, live stats during runs,
            personal best tracking per time mode, and persistent recent run history.
          </p>
        </CardContent>
      </Card>

      <Card className='border-border/70 bg-background/50'>
        <CardHeader>
          <CardTitle className='font-serif text-xl'>Shortcuts</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2 font-mono text-sm'>
          <p>
            <span className='mr-2 rounded bg-secondary px-2 py-1 text-secondary-foreground'>
              Esc
            </span>
            restart current run
          </p>
          <p>
            <span className='mr-2 rounded bg-secondary px-2 py-1 text-secondary-foreground'>
              Click Arena
            </span>
            focus typing area
          </p>
          <p>
            <span className='mr-2 rounded bg-secondary px-2 py-1 text-secondary-foreground'>
              Backspace
            </span>
            correct active word input
          </p>
        </CardContent>
      </Card>

      <Card className='border-border/70 bg-background/50'>
        <CardHeader>
          <CardTitle className='font-serif text-xl'>Built for deliberate practice</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2 text-sm text-muted-foreground'>
          <p>1. Pick a duration and focus the arena.</p>
          <p>2. Type continuously, watching live WPM and accuracy.</p>
          <p>3. Compare your run result with your personal best and recent history.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
