import { Card, CardContent } from '@/components/ui/card';

type ResultCardProps = {
  label: string;
  value: string;
  helper: string;
};

const ResultCard = ({ label, value, helper }: ResultCardProps) => {
  return (
    <Card className='border-border/70 bg-background/60 backdrop-blur'>
      <CardContent className='space-y-2 p-4'>
        <p className='text-xs uppercase tracking-[0.14em] text-muted-foreground'>{label}</p>
        <p className='font-mono text-2xl text-foreground'>{value}</p>
        <p className='text-xs text-muted-foreground'>{helper}</p>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
