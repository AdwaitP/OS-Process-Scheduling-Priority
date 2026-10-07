import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Zap, Layers } from 'lucide-react';

export const SimulatorControls = ({
  algorithm,
  setAlgorithm,
  priorityOrder,
  setPriorityOrder,
  isPlaying,
  setIsPlaying,
  currentStepIndex,
  totalSteps,
  onStepForward,
  onStepBackward,
  onReset,
  playbackSpeed,
  setPlaybackSpeed,
}) => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
      {/* Top Row: Algorithm Selection & Priority Convention Settings */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            Scheduling Algorithm
          </label>
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setAlgorithm('PREEMPTIVE_PRIORITY')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                algorithm === 'PREEMPTIVE_PRIORITY'
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pre-emptive Priority
            </button>
            <button
              onClick={() => setAlgorithm('NON_PREEMPTIVE_PRIORITY')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                algorithm === 'NON_PREEMPTIVE_PRIORITY'
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Non Pre-emptive Priority
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Priority Value Convention
          </label>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setPriorityOrder('LOWER_IS_HIGHER')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                priorityOrder === 'LOWER_IS_HIGHER'
                  ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Linux standard: Priority 1 is higher than Priority 5"
            >
              1 = Highest (Linux/Unix)
            </button>
            <button
              onClick={() => setPriorityOrder('HIGHER_IS_HIGHER')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                priorityOrder === 'HIGHER_IS_HIGHER'
                  ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Windows standard: Priority 99 is higher than Priority 1"
            >
              99 = Highest (Windows)
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row: Playback Controls & Timeline Slider */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all border border-slate-200"
            title="Reset to Step 0"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onStepBackward}
            disabled={currentStepIndex <= 0}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 transition-all border border-slate-200"
            title="Step Backward (-1 time unit)"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-blue-500/20"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                Play Simulation
              </>
            )}
          </button>

          <button
            onClick={onStepForward}
            disabled={currentStepIndex >= totalSteps - 1}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 transition-all border border-slate-200"
            title="Step Forward (+1 time unit)"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 ml-2">
            {[0.5, 1, 2, 4].map((speed) => (
              <button
                key={speed}
                onClick={() => setPlaybackSpeed(speed)}
                className={`px-2 py-1 text-[11px] font-mono rounded ${
                  playbackSpeed === speed
                    ? 'bg-white text-blue-600 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 max-w-md flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-200">
          <Zap className="w-4 h-4 text-blue-600 shrink-0" />
          <input
            type="range"
            min={0}
            max={Math.max(0, totalSteps - 1)}
            value={currentStepIndex}
            onChange={(e) => {
              setIsPlaying(false);
              const idx = parseInt(e.target.value);
            }}
            className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
          />
          <span className="text-xs font-mono font-bold text-slate-700 shrink-0 min-w-[65px] text-right">
            {currentStepIndex} / {Math.max(0, totalSteps - 1)}
          </span>
        </div>
      </div>
    </div>
  );
};
