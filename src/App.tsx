import { useEffect } from 'react';

import { useDetectDevice } from './hooks/useDetectDevice';
import { useSystem } from './hooks/useSystem';

import AboutPage from './components/About';
import Countdown from './components/Countdown';
import Footer from './components/Footer';
import Header from './components/Header';
import ModalComponent from './components/Modal';
import ModalContent from './components/ModalContent';
import Restart from './components/Restart';
import TimeCategory from './components/TimeCategory';
import UserTyped from './components/UserTyped';
import WordContainer from './components/WordContainer';
import WordWrapper from './components/WordWrapper';
import MobileNotSupported from './components/MobileNotSupported';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formatTimestamp = (timestamp: number) => {
  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
  }).format(timestamp);
};

function App() {
  const {
    charTyped,
    countdown,
    countdownProgress,
    word,
    wordContainerFocused,
    modalIsOpen,
    aboutModal,
    history,
    time,
    results,
    liveResults,
    recentRuns,
    bestWpm,
    isRunning,
    timePresets,
    setWordContainerFocused,
    restartTest,
    checkCharacter,
    closeModal,
    openModal,
    setTimePreset,
  } = useSystem();

  const isMobile = useDetectDevice();

  useEffect(() => {
    const handleGlobalShortcuts = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      event.preventDefault();
      restartTest();
    };

    window.addEventListener('keydown', handleGlobalShortcuts);
    return () => window.removeEventListener('keydown', handleGlobalShortcuts);
  }, [restartTest]);

  if (isMobile) {
    return <MobileNotSupported />;
  }

  return (
    <div className='relative h-screen overflow-hidden bg-background text-foreground'>
      <div className='pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl' />
      <div className='pointer-events-none absolute bottom-8 right-0 h-80 w-80 rounded-full bg-accent/30 blur-3xl' />

      <main className='relative mx-auto flex h-full w-full max-w-7xl flex-col gap-3 px-4 py-4 lg:px-8 lg:py-5'>
        <Header
          onRestart={restartTest}
          onOpenAbout={() => openModal('about')}
          bestWpm={bestWpm}
          currentTime={time}
        />

        <section className='grid min-h-0 flex-1 gap-3 xl:grid-cols-[1.55fr_1fr]'>
          <Card className='min-h-0 border-border/70 bg-card/65 backdrop-blur'>
            <CardContent className='flex h-full flex-col gap-4 p-4 sm:p-5'>
              <TimeCategory
                time={time}
                presets={timePresets}
                onSelectTime={setTimePreset}
              />

              <Countdown
                countdown={countdown}
                totalTime={time}
                progress={countdownProgress}
                isRunning={isRunning}
              />

              <div className='min-h-0 flex-1'>
                <WordWrapper
                focused={wordContainerFocused}
                typedLength={charTyped.length}
                setFocused={setWordContainerFocused}
                restart = {restartTest}
              >
                <WordContainer word={word} />
                <UserTyped word={word} check={checkCharacter} charTyped={charTyped} />
              </WordWrapper>
              </div>

             
            </CardContent>
          </Card>

          <div className='grid min-h-0 grid-rows-2 gap-3'>
            <Card className='min-h-0 border-border/70 bg-card/65 backdrop-blur'>
              <CardHeader className='pb-3'>
                <CardTitle className='font-serif text-2xl'>Live stats</CardTitle>
              </CardHeader>
              <CardContent className='grid gap-2 sm:grid-cols-2 xl:grid-cols-2'>
                <div className='rounded-xl border border-border/70 bg-background/70 p-4'>
                  <p className='text-xs uppercase tracking-[0.14em] text-muted-foreground'>WPM</p>
                  <p className='font-mono text-3xl text-foreground'>{liveResults.wpm}</p>
                </div>
                <div className='rounded-xl border border-border/70 bg-background/70 p-4'>
                  <p className='text-xs uppercase tracking-[0.14em] text-muted-foreground'>Accuracy</p>
                  <p className='font-mono text-3xl text-foreground'>
                    {Math.round(liveResults.accuracy)}%
                  </p>
                </div>
                <div className='rounded-xl border border-border/70 bg-background/70 p-4'>
                  <p className='text-xs uppercase tracking-[0.14em] text-muted-foreground'>CPM</p>
                  <p className='font-mono text-3xl text-foreground'>{liveResults.cpm}</p>
                </div>
                <div className='rounded-xl border border-border/70 bg-background/70 p-4'>
                  <p className='text-xs uppercase tracking-[0.14em] text-muted-foreground'>Best ({time / 1000}s)</p>
                  <p className='font-mono text-3xl text-foreground'>{bestWpm}</p>
                </div>
              </CardContent>
            </Card>

            <Card className='min-h-0 border-border/70 bg-card/65 backdrop-blur'>
              <CardHeader className='pb-3'>
                <CardTitle className='font-serif text-2xl'>Recent sessions</CardTitle>
              </CardHeader>
              <CardContent className='space-y-2'>
                {recentRuns.length ? (
                  recentRuns.slice(0, 4).map((run) => {
                    return (
                      <div
                        key={run.id}
                        className='flex items-center justify-between rounded-lg border border-border/70 bg-background/70 px-3 py-2 font-mono text-sm'
                      >
                        <span className='text-muted-foreground'>{formatTimestamp(run.timestamp)}</span>
                        <span className='text-foreground'>{run.wpm} wpm</span>
                        <span className='text-muted-foreground'>{run.time / 1000}s</span>
                      </div>
                    );
                  })
                ) : (
                  <p className='text-sm text-muted-foreground'>
                    No completed runs yet. Finish your first run to start tracking history.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer />

        <ModalComponent
          type='result'
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        >
          <ModalContent
            totalTime={time}
            results={results}
            history={history}
            bestWpm={bestWpm}
            recentRuns={recentRuns}
          />
        </ModalComponent>

        <ModalComponent type='about' isOpen={aboutModal} onRequestClose={closeModal}>
          <AboutPage />
        </ModalComponent>
      </main>
    </div>
  );
}

export default App;
