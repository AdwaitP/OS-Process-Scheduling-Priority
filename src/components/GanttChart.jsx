import React from 'react';
import { Zap, Clock } from 'lucide-react';

export const GanttChart = ({
  ganttBlocks,
  totalTime,
  currentStepTime,
  onSelectTime,
}) => {
  if (totalTime === 0 || !ganttBlocks || ganttBlocks.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 shadow-xs">
        <Clock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <p className="text-sm font-medium text-slate-700">No Gantt Chart generated yet.</p>
        <p className="text-xs text-slate-500 mt-1">
          Add processes and run simulation to visualize execution timeline.
        </p>
      </div>
    );
  }

  const totalDuration = totalTime;

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
            Execution Gantt Timeline
          </h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-600 font-mono">
          <span>Total Duration: <strong className="text-blue-600">{totalTime} units</strong></span>
          <span>·</span>
          <span>Active Step: <strong className="text-indigo-600">t={currentStepTime}</strong></span>
        </div>
      </div>

      {/* Main Gantt Bar */}
      <div className="relative pt-2 pb-6">
        <div className="flex h-14 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100 p-1 gap-0.5 shadow-inner">
          {ganttBlocks.map((block, idx) => {
            const widthPct = (block.duration / totalDuration) * 100;
            const isActive =
              currentStepTime >= block.startTime && currentStepTime < block.endTime;
            const isCompleted = currentStepTime >= block.endTime;

            return (
              <div
                key={idx}
                onClick={() => onSelectTime && onSelectTime(block.startTime)}
                style={{
                  width: `${widthPct}%`,
                  backgroundColor: block.processId === 'IDLE' ? '#CBD5E1' : block.color,
                }}
                className={`group relative h-full flex flex-col items-center justify-center transition-all cursor-pointer select-none rounded-md ${
                  isActive
                    ? 'ring-2 ring-blue-600 ring-offset-2 ring-offset-white z-10 scale-[1.02] shadow-md'
                    : isCompleted
                    ? 'opacity-95 hover:opacity-100'
                    : 'opacity-60 hover:opacity-80'
                }`}
              >
                <span className="text-xs font-bold text-white tracking-wider font-mono drop-shadow truncate px-1">
                  {block.processId}
                </span>

                <span className="text-[10px] text-white/90 font-mono font-medium">
                  {block.duration}u
                </span>

                {idx < ganttBlocks.length - 1 &&
                  ganttBlocks[idx + 1].processId !== block.processId &&
                  block.processId !== 'IDLE' && (
                    <div className="absolute right-0 top-0.5 transform translate-x-1/2 z-20">
                      <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400 drop-shadow-md" />
                    </div>
                  )}

                <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-30">
                  <div className="bg-slate-900 border border-slate-700 text-slate-100 text-xs rounded-lg px-2.5 py-1.5 shadow-xl font-mono whitespace-nowrap">
                    <p className="font-bold text-cyan-300">{block.processName}</p>
                    <p className="text-[10px] text-slate-300">
                      Time Range: [{block.startTime} → {block.endTime}]
                    </p>
                    <p className="text-[10px] text-indigo-300">
                      Duration: {block.duration} CPU units
                    </p>
                  </div>
                  <div className="w-2 h-2 bg-slate-900 border-r border-b border-slate-700 rotate-45 -mt-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Time Tick Ruler */}
        <div className="relative w-full h-6 mt-1 flex text-[10px] font-mono text-slate-600">
          <div
            onClick={() => onSelectTime && onSelectTime(0)}
            className="absolute left-0 top-0 cursor-pointer hover:text-blue-600 transition-colors flex flex-col items-center"
          >
            <div className="w-px h-2 bg-slate-300 mb-0.5" />
            <span>0</span>
          </div>

          {ganttBlocks.map((block, idx) => {
            const posPct = (block.endTime / totalDuration) * 100;
            const isCurrentTick = currentStepTime === block.endTime;

            return (
              <div
                key={idx}
                onClick={() => onSelectTime && onSelectTime(block.endTime)}
                style={{ left: `${posPct}%` }}
                className={`absolute top-0 transform -translate-x-1/2 cursor-pointer transition-all flex flex-col items-center ${
                  isCurrentTick ? 'text-blue-600 font-bold z-20' : 'hover:text-blue-500'
                }`}
              >
                <div
                  className={`w-px h-2 ${
                    isCurrentTick ? 'bg-blue-600 h-3' : 'bg-slate-300'
                  } mb-0.5`}
                />
                <span>{block.endTime}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
