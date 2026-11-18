// Fixed architectural grid: 1px hairlines that frame the viewport.
// The outer two lines match the content frame; inner lines mark the 12-col rhythm on large screens.
export function GridFrame() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="mx-auto h-full max-w-[1320px] border-x border-hair">
        <div className="hidden h-full grid-cols-4 lg:grid">
          <div className="border-r border-hair" />
          <div className="border-r border-hair" />
          <div className="border-r border-hair" />
          <div />
        </div>
      </div>
    </div>
  );
}
