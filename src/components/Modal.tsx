import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type ModalType = 'result' | 'about';

type ModalProps = {
  type: ModalType;
  isOpen: boolean;
  onRequestClose: (type: ModalType) => void;
  children: React.ReactNode;
};

const titleMap: Record<ModalType, string> = {
  result: 'Run summary',
  about: 'About Typr',
};

const descriptionMap: Record<ModalType, string> = {
  result: 'Performance details for your latest typing run.',
  about: 'What the app does and how to get the best training session.',
};

const ModalComponent = ({
  type,
  isOpen,
  onRequestClose,
  children,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onRequestClose(type)}>
      <DialogContent className='max-h-[90vh] overflow-y-auto rounded-3xl border border-border/70 bg-card p-0'>
        <DialogHeader className='sticky top-0 z-10 border-b border-border/70 bg-card/95 px-6 py-5 backdrop-blur'>
          <DialogTitle className='font-serif text-2xl text-foreground'>
            {titleMap[type]}
          </DialogTitle>
          <DialogDescription>{descriptionMap[type]}</DialogDescription>
        </DialogHeader>
        <div className='px-6 pb-6 pt-2'>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalComponent;
