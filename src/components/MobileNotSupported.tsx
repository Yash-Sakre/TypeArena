const MobileNotSupported = () => {
  return (
    <div className='flex min-h-screen items-center justify-center px-4'>
      <div className='max-w-md rounded-3xl border border-border/70 bg-card/70 p-6 text-center backdrop-blur'>
        <h1 className='font-serif text-3xl text-foreground'>Desktop only</h1>
        <p className='mt-3 text-sm text-muted-foreground'>
          Typr currently needs a physical keyboard and a larger layout.
          Open this on desktop or laptop for the full typing experience.
        </p>
      </div>
    </div>
  );
};

export default MobileNotSupported;
