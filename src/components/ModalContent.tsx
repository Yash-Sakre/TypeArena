import { useMemo, useState } from 'react';

import { useClipboard } from '../hooks/useClipboard';

import { IoCopyOutline } from 'react-icons/io5';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import Character from './Character';
import ResultCard from './ResultCard';

import type { HistoryType, Results, RunRecord } from '../types';

type ModalContentProps = {
  totalTime: number;
  history: HistoryType;
  results: Results;
  bestWpm: number;
  recentRuns: RunRecord[];
};

const formatTimestamp = (timestamp: number) => {
  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
  }).format(timestamp);
};

const ModalContent = ({
  totalTime,
  history,
  results,
  bestWpm,
  recentRuns,
}: ModalContentProps) => {
  const [copied, setCopied] = useState(false);

  const { copyTextToClipboard } = useClipboard();

  const correctCharacters = useMemo(() => {
    if (!history.typedHistory.length) return 0;
    return Math.round(history.typedHistory.length * (results.accuracy / 100));
  }, [history.typedHistory.length, results.accuracy]);

  const incorrectCharacters = history.typedHistory.length - correctCharacters;

  return (
    <div className='space-y-6'>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <ResultCard
          label='Speed'
          value={`${results.wpm} wpm`}
          helper={`${results.cpm} cpm`}
        />
        <ResultCard
          label='Accuracy'
          value={`${Math.round(results.accuracy)}%`}
          helper={`${Math.round(results.error)}% error`}
        />
        <ResultCard
          label='Characters'
          value={`${correctCharacters}/${history.typedHistory.length}`}
          helper={`${incorrectCharacters} incorrect`}
        />
        <ResultCard
          label='Best on this time'
          value={`${bestWpm} wpm`}
          helper={`Run length: ${totalTime / 1000}s`}
        />
      </div>

      <Card className='border-border/70 bg-background/50'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0'>
          <CardTitle className='font-serif text-xl'>Typed transcript</CardTitle>
          <Button
            variant='outline'
            size='sm'
            onClick={async () => {
              const isCopied = await copyTextToClipboard(history.typedHistory);
              if (!isCopied) return;

              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            }}
          >
            <IoCopyOutline className='mr-2' />
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </CardHeader>
        <CardContent>
          <p className='rounded-xl border border-border/70 bg-background px-4 py-3 font-mono text-lg leading-relaxed text-muted-foreground'>
            {history.typedHistory.split('').map((char, index) => {
              return (
                <Character
                  key={`${char}-${index}`}
                  character={history.wordHistory[index]}
                  state={history.wordHistory[index] === char}
                />
              );
            })}
          </p>
        </CardContent>
      </Card>

      <Card className='border-border/70 bg-background/50'>
        <CardHeader>
          <CardTitle className='font-serif text-xl'>Recent runs</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2'>
          {recentRuns.length ? (
            recentRuns.map((run) => {
              return (
                <div
                  key={run.id}
                  className='flex items-center justify-between rounded-lg border border-border/60 bg-background px-3 py-2'
                >
                  <span className='font-mono text-sm text-muted-foreground'>
                    {formatTimestamp(run.timestamp)}
                  </span>
                  <span className='font-mono text-sm text-foreground'>
                    {run.wpm} wpm / {Math.round(run.accuracy)}%
                  </span>
                  <span className='font-mono text-sm text-muted-foreground'>
                    {run.time / 1000}s
                  </span>
                </div>
              );
            })
          ) : (
            <p className='text-sm text-muted-foreground'>
              No run history yet. Complete one run to populate this panel.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ModalContent;
