/**
 * Pure JavaScript CPU Scheduler Engine for Priority Scheduling.
 * Pre-emptive and Non Pre-emptive algorithms.
 */

export function isHigherPriority(priorityA, priorityB, order) {
  if (order === 'LOWER_IS_HIGHER') {
    return priorityA < priorityB;
  }
  return priorityA > priorityB;
}

export function compareProcessPriority(p1, p2, order) {
  if (p1.currentPriority !== p2.currentPriority) {
    return isHigherPriority(p1.currentPriority, p2.currentPriority, order) ? -1 : 1;
  }
  // Tie-breaker 1: Arrival Time (FCFS)
  if (p1.arrivalTime !== p2.arrivalTime) {
    return p1.arrivalTime - p2.arrivalTime;
  }
  // Tie-breaker 2: Process ID
  return String(p1.id).localeCompare(String(p2.id));
}

export function runSimulation(processes, algorithm, priorityOrder) {
  if (!processes || processes.length === 0) {
    return {
      algorithm,
      priorityOrder,
      ganttBlocks: [],
      steps: [],
      processResults: [],
      metrics: {
        avgTurnaroundTime: 0,
        avgWaitingTime: 0,
        avgResponseTime: 0,
        totalExecutionTime: 0,
        cpuUtilization: 0,
        contextSwitches: 0,
        throughput: 0,
      },
    };
  }

  // Deep clone processes into initial runtime state
  const procMap = {};
  processes.forEach((p) => {
    procMap[p.id] = {
      ...p,
      remainingTime: p.burstTime,
      currentPriority: p.priority,
      completionTime: null,
      turnaroundTime: null,
      waitingTime: null,
      responseTime: null,
      firstExecutedTime: null,
      waitingTicks: 0,
      state: 'READY',
    };
  });

  const totalBurst = processes.reduce((acc, p) => acc + p.burstTime, 0);
  const steps = [];
  const ganttBlocks = [];

  let currentTime = 0;
  let completedCount = 0;
  let currentRunningId = null;
  let contextSwitches = 0;
  const isPreemptive = algorithm === 'PREEMPTIVE_PRIORITY';

  const maxSimTime = totalBurst + Math.max(...processes.map((p) => p.arrivalTime)) + 500;

  while (completedCount < processes.length && currentTime < maxSimTime) {
    // 1. Newly arrived processes
    const newlyArrived = Object.values(procMap).filter(
      (p) => p.arrivalTime === currentTime && p.completionTime === null
    );

    // 2. Ready queue processes
    let readyQueueList = Object.values(procMap).filter(
      (p) =>
        p.arrivalTime <= currentTime &&
        p.completionTime === null &&
        p.id !== currentRunningId
    );

    readyQueueList.forEach((p) => {
      if (currentTime > p.arrivalTime) {
        p.waitingTicks += 1;
      }
    });

    readyQueueList.sort((a, b) => compareProcessPriority(a, b, priorityOrder));

    // 3. Selection decision
    let selectedId = null;
    let eventType = 'EXECUTE';
    let actionMessage = '';

    if (currentRunningId !== null) {
      const runningProc = procMap[currentRunningId];

      if (runningProc.remainingTime === 0) {
        runningProc.completionTime = currentTime;
        runningProc.turnaroundTime = currentTime - runningProc.arrivalTime;
        runningProc.waitingTime = runningProc.turnaroundTime - runningProc.burstTime;
        runningProc.state = 'COMPLETED';
        completedCount++;

        actionMessage = `${runningProc.name} completed execution at t=${currentTime}. (TAT=${runningProc.turnaroundTime}, WT=${runningProc.waitingTime})`;
        eventType = 'COMPLETE';

        currentRunningId = null;
      } else if (isPreemptive) {
        if (readyQueueList.length > 0) {
          const topReady = readyQueueList[0];
          if (
            isHigherPriority(
              topReady.currentPriority,
              runningProc.currentPriority,
              priorityOrder
            )
          ) {
            actionMessage = `t=${currentTime}: ${topReady.name} (Priority ${topReady.currentPriority}) preempts ${runningProc.name} (Priority ${runningProc.currentPriority}).`;
            eventType = 'PREEMPT';
            contextSwitches++;
            runningProc.state = 'READY';

            readyQueueList.push(runningProc);
            readyQueueList.sort((a, b) =>
              compareProcessPriority(a, b, priorityOrder)
            );
            currentRunningId = null;
          }
        }
      }
    }

    if (currentRunningId === null && completedCount < processes.length) {
      if (readyQueueList.length > 0) {
        const nextProc = readyQueueList[0];
        selectedId = nextProc.id;

        if (nextProc.firstExecutedTime === null) {
          nextProc.firstExecutedTime = currentTime;
          nextProc.responseTime = currentTime - nextProc.arrivalTime;
        }

        nextProc.state = 'RUNNING';

        if (eventType !== 'PREEMPT' && eventType !== 'COMPLETE') {
          if (newlyArrived.length > 0) {
            actionMessage = `t=${currentTime}: ${nextProc.name} selected to run (Priority ${nextProc.currentPriority}).`;
            eventType = 'ARRIVE';
          } else {
            actionMessage = `t=${currentTime}: ${nextProc.name} assigned to CPU.`;
          }
        }

        currentRunningId = selectedId;
      } else {
        selectedId = null;
        actionMessage = `t=${currentTime}: CPU is Idle (no processes in ready queue).`;
        eventType = 'IDLE';
      }
    }

    const readyQueueSnapshot = readyQueueList
      .filter((p) => p.id !== currentRunningId)
      .map((p) => ({
        id: p.id,
        name: p.name,
        basePriority: p.priority,
        currentPriority: p.currentPriority,
        waitingTicks: p.waitingTicks,
        color: p.color,
      }));

    const processSnapshots = {};
    Object.keys(procMap).forEach((id) => {
      processSnapshots[id] = { ...procMap[id] };
    });

    steps.push({
      time: currentTime,
      runningProcessId: currentRunningId,
      readyQueue: readyQueueSnapshot,
      completedProcessIds: Object.values(procMap)
        .filter((p) => p.state === 'COMPLETED')
        .map((p) => p.id),
      actionMessage,
      event: eventType,
      processSnapshots,
    });

    if (currentRunningId !== null) {
      const runningProc = procMap[currentRunningId];

      const lastGantt = ganttBlocks[ganttBlocks.length - 1];
      if (lastGantt && lastGantt.processId === runningProc.id) {
        lastGantt.endTime = currentTime + 1;
        lastGantt.duration += 1;
      } else {
        ganttBlocks.push({
          processId: runningProc.id,
          processName: runningProc.name,
          startTime: currentTime,
          endTime: currentTime + 1,
          duration: 1,
          color: runningProc.color,
        });
      }

      runningProc.remainingTime -= 1;
    } else if (completedCount < processes.length) {
      const lastGantt = ganttBlocks[ganttBlocks.length - 1];
      if (lastGantt && lastGantt.processId === 'IDLE') {
        lastGantt.endTime = currentTime + 1;
        lastGantt.duration += 1;
      } else {
        ganttBlocks.push({
          processId: 'IDLE',
          processName: 'IDLE',
          startTime: currentTime,
          endTime: currentTime + 1,
          duration: 1,
          color: '#CBD5E1',
        });
      }
    }

    currentTime++;
  }

  const completedProcs = Object.values(procMap);
  const totalTAT = completedProcs.reduce((acc, p) => acc + (p.turnaroundTime || 0), 0);
  const totalWT = completedProcs.reduce((acc, p) => acc + (p.waitingTime || 0), 0);
  const totalRT = completedProcs.reduce((acc, p) => acc + (p.responseTime || 0), 0);

  const totalTimeTaken = currentTime;
  const busyCpuTime = totalBurst;
  const cpuUtilization = totalTimeTaken > 0 ? (busyCpuTime / totalTimeTaken) * 100 : 0;
  const throughput = totalTimeTaken > 0 ? completedProcs.length / totalTimeTaken : 0;

  return {
    algorithm,
    priorityOrder,
    ganttBlocks,
    steps,
    processResults: completedProcs,
    metrics: {
      avgTurnaroundTime: parseFloat((totalTAT / completedProcs.length || 0).toFixed(2)),
      avgWaitingTime: parseFloat((totalWT / completedProcs.length || 0).toFixed(2)),
      avgResponseTime: parseFloat((totalRT / completedProcs.length || 0).toFixed(2)),
      totalExecutionTime: totalTimeTaken,
      cpuUtilization: parseFloat(cpuUtilization.toFixed(1)),
      contextSwitches,
      throughput: parseFloat(throughput.toFixed(3)),
    },
  };
}
