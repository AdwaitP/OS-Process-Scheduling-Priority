import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.jsx';
import { GanttChart } from './components/GanttChart.jsx';
import { ReadyQueueVisualizer } from './components/ReadyQueueVisualizer.jsx';
import { ProcessTable } from './components/ProcessTable.jsx';
import { MetricsOverview } from './components/MetricsOverview.jsx';
import { SimulatorControls } from './components/SimulatorControls.jsx';
import { CompareView } from './components/CompareView.jsx';
import { EducationalHub } from './components/EducationalHub.jsx';
import { InteractiveQuiz } from './components/InteractiveQuiz.jsx';

import { runSimulation } from './utils/schedulerEngine.js';

const INITIAL_PROCESSES = [
  { id: 'P1', name: 'P1 (Background Task)', arrivalTime: 0, burstTime: 8, priority: 3, color: '#2563EB' },
  { id: 'P2', name: 'P2 (Mouse Input)', arrivalTime: 2, burstTime: 3, priority: 1, color: '#059669' },
  { id: 'P3', name: 'P3 (Display Refresh)', arrivalTime: 3, burstTime: 2, priority: 2, color: '#D97706' },
  { id: 'P4', name: 'P4 (Print Job)', arrivalTime: 5, burstTime: 4, priority: 4, color: '#DB2777' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('SIMULATOR');
  const [algorithm, setAlgorithm] = useState('PREEMPTIVE_PRIORITY');
  const [priorityOrder, setPriorityOrder] = useState('LOWER_IS_HIGHER');

  const [processes, setProcesses] = useState(INITIAL_PROCESSES);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const simResult = runSimulation(processes, algorithm, priorityOrder);

  const totalSteps = simResult.steps.length;
  const currentStep = simResult.steps[currentStepIndex] || simResult.steps[0] || null;

  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [algorithm, priorityOrder, processes]);

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= totalSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, totalSteps, playbackSpeed]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6 space-y-6">
        {activeTab === 'SIMULATOR' && (
          <div className="space-y-6">
            <SimulatorControls
              algorithm={algorithm}
              setAlgorithm={setAlgorithm}
              priorityOrder={priorityOrder}
              setPriorityOrder={setPriorityOrder}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              currentStepIndex={currentStepIndex}
              totalSteps={totalSteps}
              onStepForward={() =>
                setCurrentStepIndex((prev) => Math.min(totalSteps - 1, prev + 1))
              }
              onStepBackward={() =>
                setCurrentStepIndex((prev) => Math.max(0, prev - 1))
              }
              onReset={() => {
                setIsPlaying(false);
                setCurrentStepIndex(0);
              }}
              playbackSpeed={playbackSpeed}
              setPlaybackSpeed={setPlaybackSpeed}
            />

            <ReadyQueueVisualizer
              currentStep={currentStep}
              priorityOrder={priorityOrder}
            />

            <GanttChart
              ganttBlocks={simResult.ganttBlocks}
              totalTime={simResult.metrics.totalExecutionTime}
              currentStepTime={currentStep?.time || 0}
              onSelectTime={(t) => {
                const idx = simResult.steps.findIndex((s) => s.time === t);
                if (idx !== -1) {
                  setIsPlaying(false);
                  setCurrentStepIndex(idx);
                }
              }}
            />

            <MetricsOverview metrics={simResult.metrics} />

            <ProcessTable
              processes={processes}
              processResults={simResult.processResults}
              priorityOrder={priorityOrder}
              onUpdateProcesses={setProcesses}
              isSimulating={isPlaying}
            />
          </div>
        )}

        {activeTab === 'COMPARE' && (
          <CompareView processes={processes} priorityOrder={priorityOrder} />
        )}

        {activeTab === 'LEARN' && <EducationalHub />}

        {activeTab === 'QUIZ' && <InteractiveQuiz />}
      </main>

      <footer className="border-t border-slate-200 bg-white py-4 px-6 text-center text-xs text-slate-500 font-mono">
        <span>OS Priority Scheduling Lab · Pre-emptive & Non Pre-emptive Computer Science Masterclass</span>
      </footer>
    </div>
  );
}
