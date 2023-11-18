import type { PropsWithChildren } from "react";
import { useAtom } from "signia-react";

export const SignalCounter = ({ children }: PropsWithChildren) => {
  const countSignal = useAtom("count", 0);

  return (
    <section>
      <div>SignalCounter</div>
      <button onClick={() => countSignal.update((prev) => prev + 1)}>
        Signal is {countSignal.value}
      </button>
      {children}
    </section>
  );
};
