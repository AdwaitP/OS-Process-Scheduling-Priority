import React from 'react';
import { Plus, Trash2, Info, Edit3 } from 'lucide-react';

const PRESET_COLOR_PALETTE = [
  '#2563EB',
  '#059669',
  '#D97706',
  '#DB2777',
  '#7C3AED',
  '#0891B2',
  '#EA580C',
  '#4F46E5',
];

export const ProcessTable = ({
  processes,
  processResults,
  priorityOrder,
  onUpdateProcesses,
  isSimulating,
}) => {
  const resultMap = new Map();
  processResults.forEach((p) => resultMap.set(p.id, p));

  const handleAddProcess = () => {
    const nextNum = processes.length + 1;
    const colorIndex = (nextNum - 1) % PRESET_COLOR_PALETTE.length;
    const newProc = {
      id: `P${nextNum}`,
      name: `P${nextNum} (Custom Task)`,
      arrivalTime: Math.min(nextNum - 1, 5),
      burstTime: Math.floor(Math.random() * 5) + 2,
      priority: Math.floor(Math.random() * 4) + 1,
      color: PRESET_COLOR_PALETTE[colorIndex],
    };
    onUpdateProcesses([...processes, newProc]);
  };

  const handleDeleteProcess = (id) => {
    if (processes.length <= 1) return;
    onUpdateProcesses(processes.filter((p) => p.id !== id));
  };

  const handleFieldChange = (id, field, value) => {
    onUpdateProcesses(
      processes.map((p) => {
        if (p.id === id) {
          return { ...p, [field]: value };
        }
        return p;
      })
    );
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-blue-600" />
            Process Set & Detailed Calculation Matrix
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Modify Arrival Time, Burst Time, or Priority below. Higher priority is determined by{' '}
            <strong className="text-blue-700 font-semibold">
              {priorityOrder === 'LOWER_IS_HIGHER' ? 'Lower Number (e.g. 1 > 5)' : 'Higher Number (e.g. 5 > 1)'}
            </strong>.
          </p>
        </div>

        <button
          onClick={handleAddProcess}
          disabled={isSimulating}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-xs transition-all shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Process
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
        <table className="w-full text-left text-xs font-mono border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase tracking-wider text-[11px] font-bold">
              <th className="p-3">Process</th>
              <th className="p-3">Color</th>
              <th className="p-3">Arrival (AT)</th>
              <th className="p-3">Burst (BT)</th>
              <th className="p-3">Priority</th>
              <th className="p-3 text-cyan-700">Completion (CT)</th>
              <th className="p-3 text-indigo-700">
                <span className="flex items-center gap-1 group cursor-help">
                  Turnaround (TAT)
                  <Info className="w-3 h-3 text-indigo-500 opacity-80" />
                </span>
              </th>
              <th className="p-3 text-emerald-700">
                <span className="flex items-center gap-1 group cursor-help">
                  Waiting (WT)
                  <Info className="w-3 h-3 text-emerald-500 opacity-80" />
                </span>
              </th>
              <th className="p-3 text-amber-700">
                <span className="flex items-center gap-1 group cursor-help">
                  Response (RT)
                  <Info className="w-3 h-3 text-amber-500 opacity-80" />
                </span>
              </th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-800">
            {processes.map((proc) => {
              const res = resultMap.get(proc.id);

              return (
                <tr key={proc.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-3 font-bold">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs"
                        style={{ backgroundColor: proc.color }}
                      />
                      <input
                        type="text"
                        value={proc.id}
                        disabled={isSimulating}
                        onChange={(e) => handleFieldChange(proc.id, 'id', e.target.value)}
                        className="bg-slate-50 border border-slate-300 rounded px-2 py-1 w-16 text-center font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </td>

                  <td className="p-3">
                    <input
                      type="color"
                      value={proc.color}
                      disabled={isSimulating}
                      onChange={(e) => handleFieldChange(proc.id, 'color', e.target.value)}
                      className="w-7 h-7 rounded cursor-pointer bg-transparent border-0"
                    />
                  </td>

                  <td className="p-3">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={proc.arrivalTime}
                      disabled={isSimulating}
                      onChange={(e) =>
                        handleFieldChange(
                          proc.id,
                          'arrivalTime',
                          Math.max(0, parseInt(e.target.value) || 0)
                        )
                      }
                      className="bg-slate-50 border border-slate-300 rounded px-2 py-1 w-16 text-center font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </td>

                  <td className="p-3">
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={proc.burstTime}
                      disabled={isSimulating}
                      onChange={(e) =>
                        handleFieldChange(
                          proc.id,
                          'burstTime',
                          Math.max(1, parseInt(e.target.value) || 1)
                        )
                      }
                      className="bg-slate-50 border border-slate-300 rounded px-2 py-1 w-16 text-center font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </td>

                  <td className="p-3">
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={proc.priority}
                      disabled={isSimulating}
                      onChange={(e) =>
                        handleFieldChange(proc.id, 'priority', parseInt(e.target.value) || 1)
                      }
                      className="bg-slate-50 border border-blue-300 rounded px-2 py-1 w-16 text-center font-bold text-blue-700 focus:outline-none focus:border-blue-600"
                    />
                  </td>

                  <td className="p-3 font-bold text-cyan-700 tabular-nums">
                    {res?.completionTime !== null && res?.completionTime !== undefined
                      ? `${res.completionTime}`
                      : '-'}
                  </td>

                  <td className="p-3 font-bold text-indigo-700 tabular-nums">
                    {res?.turnaroundTime !== null && res?.turnaroundTime !== undefined ? (
                      <span
                        title={`Formula: CT (${res.completionTime}) - AT (${res.arrivalTime}) = ${res.turnaroundTime}`}
                      >
                        {res.turnaroundTime}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>

                  <td className="p-3 font-bold text-emerald-700 tabular-nums">
                    {res?.waitingTime !== null && res?.waitingTime !== undefined ? (
                      <span
                        title={`Formula: TAT (${res.turnaroundTime}) - BT (${res.burstTime}) = ${res.waitingTime}`}
                      >
                        {res.waitingTime}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>

                  <td className="p-3 font-bold text-amber-700 tabular-nums">
                    {res?.responseTime !== null && res?.responseTime !== undefined ? (
                      <span
                        title={`Formula: First Exec (${res.firstExecutedTime}) - AT (${res.arrivalTime}) = ${res.responseTime}`}
                      >
                        {res.responseTime}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>

                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDeleteProcess(proc.id)}
                      disabled={processes.length <= 1 || isSimulating}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-all disabled:opacity-30"
                      title="Delete process"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-[11px] text-slate-600 font-mono bg-slate-50 p-3 rounded-lg border border-slate-200">
        <div>
          <strong className="text-indigo-700 font-bold">Turnaround Time (TAT)</strong>
          <p className="text-slate-500 mt-0.5">TAT = Completion Time (CT) - Arrival Time (AT)</p>
        </div>
        <div>
          <strong className="text-emerald-700 font-bold">Waiting Time (WT)</strong>
          <p className="text-slate-500 mt-0.5">WT = Turnaround Time (TAT) - Burst Time (BT)</p>
        </div>
        <div>
          <strong className="text-amber-700 font-bold">Response Time (RT)</strong>
          <p className="text-slate-500 mt-0.5">RT = First Response Time - Arrival Time (AT)</p>
        </div>
      </div>
    </div>
  );
};
