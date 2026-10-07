import React from 'react';
import { Cpu, ArrowRight, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

export const ReadyQueueVisualizer = ({ currentStep, priorityOrder }) => {
  if (!currentStep) {
    return null;
  }

  const { time, runningProcessId, readyQueue, actionMessage, event, processSnapshots } =
    currentStep;

  const runningProcess = runningProcessId ? processSnapshots[runningProcessId] : null;

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
      {/* Event Narrative Callout Banner */}
      <div
        className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all ${
          event === 'PREEMPT'
            ? 'bg-amber-50 border-amber-200 text-amber-900'
            : event === 'COMPLETE'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
            : event === 'ARRIVE'
            ? 'bg-blue-50 border-blue-200 text-blue-900'
            : event === 'IDLE'
            ? 'bg-slate-100 border-slate-200 text-slate-700'
            : 'bg-indigo-50 border-indigo-200 text-indigo-900'
        }`}
      >
        {event === 'PREEMPT' ? (
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
        ) : event === 'COMPLETE' ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
        ) : (
          <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
        )}
        <div className="flex-1 text-xs md:text-sm font-medium font-mono">
          <span className="text-slate-500 font-bold mr-2">[Step t={time}]</span>
          {actionMessage}
        </div>
      </div>

      {/* Main CPU & Queue Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Ready Queue Column (Left 7 Cols) */}
        <div className="lg:col-span-7 bg-slate-50/80 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              Ready Queue ({readyQueue.length} Waiting)
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              Order: {priorityOrder === 'LOWER_IS_HIGHER' ? '1=Highest' : '99=Highest'}
            </span>
          </div>

          <div className="py-3 min-h-[90px] flex items-center gap-2.5 overflow-x-auto scrollbar-none">
            {readyQueue.length === 0 ? (
              <div className="w-full text-center py-4 text-slate-500 text-xs italic">
                Ready queue is empty
              </div>
            ) : (
              readyQueue.map((item, idx) => (
                <div
                  key={item.id}
                  className="shrink-0 bg-white border border-slate-200 rounded-xl p-2.5 min-w-[120px] shadow-xs hover:border-blue-500 transition-all flex flex-col gap-1.5 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">#{idx + 1}</span>
                    <span
                      className="text-xs font-bold px-1.5 py-0.5 rounded text-white font-mono shadow-xs"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.id}
                    </span>
                  </div>

                  <div className="text-center py-0.5">
                    <div className="text-sm font-extrabold text-slate-900 font-mono">
                      Priority: {item.currentPriority}
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500 text-center font-mono">
                    Wait: {item.waitingTicks} ticks
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="pt-2 border-t border-slate-200 flex items-center justify-end text-[11px] text-slate-500 font-mono gap-2">
            <span>Dispatched to CPU</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
          </div>
        </div>

        {/* CPU Core Box (Right 5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-50/60 via-slate-50 to-indigo-50/60 border border-blue-200 rounded-xl p-4 flex flex-col justify-between shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-blue-200/80 z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-600 animate-pulse" />
              CPU Core Executing
            </span>
            <span className="text-[11px] font-mono text-slate-600 font-semibold">Time t={time}</span>
          </div>

          <div className="py-4 flex items-center justify-center z-10">
            {runningProcess ? (
              <div className="flex items-center gap-4 bg-white border border-blue-200 rounded-xl p-3.5 w-full shadow-xs">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black text-white font-mono shadow-md shrink-0"
                  style={{ backgroundColor: runningProcess.color }}
                >
                  {runningProcess.id}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate font-sans">
                    {runningProcess.name}
                  </h4>
                  <div className="flex items-center gap-3 mt-1 text-xs font-mono text-slate-700">
                    <span>
                      Priority: <strong className="text-blue-600">{runningProcess.currentPriority}</strong>
                    </span>
                    <span>·</span>
                    <span>
                      Remaining: <strong className="text-amber-600">{runningProcess.remainingTime}u</strong> / {runningProcess.burstTime}u
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2 border border-slate-200">
                    <div
                      className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                      style={{
                        width: `${
                          ((runningProcess.burstTime - runningProcess.remainingTime) /
                            runningProcess.burstTime) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-3">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest font-mono">
                  [ CPU IDLE ]
                </div>
                <div className="text-xs text-slate-500 mt-1">Waiting for arrived processes</div>
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-500 font-mono text-center z-10">
            {runningProcess
              ? `Exec Burst: ${runningProcess.burstTime - runningProcess.remainingTime} of ${runningProcess.burstTime}`
              : '0 Active Threads'}
          </div>
        </div>
      </div>
    </div>
  );
};
