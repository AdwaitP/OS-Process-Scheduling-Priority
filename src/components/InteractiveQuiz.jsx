import React, { useState } from 'react';
import { CertificateModal } from './CertificateModal.jsx';
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Award, ArrowRight, Printer, User } from 'lucide-react';

export const QUIZ_QUESTIONS = [
  // EASY QUESTIONS (4)
  {
    id: 1,
    difficulty: 'EASY',
    question: 'What is the primary factor used by a Priority CPU Scheduling algorithm to select the next process from the ready queue?',
    options: [
      'The process with the longest arrival time.',
      'The process with the highest assigned numerical priority value.',
      'The process with the smallest memory allocation.',
      'The process submitted first in the queue regardless of priority.',
    ],
    correctAnswerIndex: 1,
    explanation:
      'A Priority CPU Scheduler evaluates all ready processes and allocates CPU execution time to the process with the highest assigned priority.',
  },
  {
    id: 2,
    difficulty: 'EASY',
    question: 'In Non Pre-emptive Priority scheduling, what happens when a new process arrives with a higher priority than the process currently executing on the CPU?',
    options: [
      'The current process is immediately interrupted and suspended.',
      'The currently executing process runs to completion before the higher priority process gets CPU time.',
      'Both processes share the CPU using round-robin time slicing.',
      'The currently executing process is aborted and restarted later.',
    ],
    correctAnswerIndex: 1,
    explanation:
      'In Non Pre-emptive scheduling, once a process begins execution on the CPU, it cannot be interrupted mid-burst. Higher priority newcomers wait in the ready queue until the running process finishes.',
  },
  {
    id: 3,
    difficulty: 'EASY',
    question: 'How is Turnaround Time (TAT) calculated for a process?',
    options: [
      'TAT = Burst Time (BT) - Waiting Time (WT)',
      'TAT = Completion Time (CT) - Arrival Time (AT)',
      'TAT = Response Time (RT) + Burst Time (BT)',
      'TAT = Completion Time (CT) + Arrival Time (AT)',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Turnaround Time is the total time elapsed from process arrival to process completion: TAT = Completion Time (CT) - Arrival Time (AT).',
  },
  {
    id: 4,
    difficulty: 'EASY',
    question: 'Under standard Unix/Linux priority conventions (where lower numerical value = higher priority), which process has higher priority?',
    options: [
      'Process A with Priority 1',
      'Process B with Priority 5',
      'Both Process A and B have equal priority',
      'Priority cannot be compared in Linux',
    ],
    correctAnswerIndex: 0,
    explanation:
      'In Unix/Linux (and NICE values), lower numerical values indicate higher priority (e.g. Priority 1 is higher priority than Priority 5).',
  },

  // DIFFICULT QUESTIONS (6)
  {
    id: 5,
    difficulty: 'DIFFICULT',
    question: 'SCENARIO CALCULATION: Processes arrive as follows (Lower number = higher priority):\n• P1: AT = 0, BT = 6, Priority = 3\n• P2: AT = 2, BT = 3, Priority = 1\nUnder Pre-emptive Priority Scheduling, at what time unit does P1 complete execution?',
    options: [
      't = 6',
      't = 8',
      't = 9',
      't = 11',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Trace: P1 runs from t=0 to t=2 (2 units done, 4 units remaining). At t=2, P2 arrives with Priority 1 and preempts P1. P2 runs from t=2 to t=5 (3 units). At t=5, P2 completes. P1 resumes at t=5 and runs its remaining 4 units, finishing at t=5+4 = t=9!',
  },
  {
    id: 6,
    difficulty: 'DIFFICULT',
    question: 'SCENARIO CALCULATION: Processes arrive as follows (Lower number = higher priority):\n• P1: AT = 0, BT = 5, Priority = 3\n• P2: AT = 1, BT = 3, Priority = 1\n• P3: AT = 2, BT = 2, Priority = 2\nUnder Non Pre-emptive Priority Scheduling, what is the Waiting Time (WT) for process P3?',
    options: [
      'WT = 4 units',
      'WT = 6 units',
      'WT = 2 units',
      'WT = 8 units',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Trace: Non Pre-emptive, so P1 runs to completion from t=0 to t=5. At t=5, both P2 (Priority 1) and P3 (Priority 2) are in queue. P2 runs from t=5 to t=8. P3 then runs from t=8 to t=10. P3 arrived at t=2 and started at t=8, so P3 Waiting Time = 8 - 2 = 6 units!',
  },
  {
    id: 7,
    difficulty: 'DIFFICULT',
    question: 'CONTEXT SWITCH COUNT: Under Pre-emptive Priority scheduling (Lower number = higher priority):\n• P1: AT = 0, BT = 10, Priority = 4\n• P2: AT = 2, BT = 2, Priority = 2\n• P3: AT = 3, BT = 1, Priority = 1\nHow many preemption context switches occur during the execution of all three processes?',
    options: [
      '1 Preemption',
      '2 Preemptions',
      '3 Preemptions',
      '0 Preemptions',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Trace: P1 starts at t=0. At t=2, P2 (Priority 2) preempts P1 (Preemption 1!). P2 runs from t=2 to t=3. At t=3, P3 (Priority 1) arrives and preempts P2 (Preemption 2!). P3 runs t=3 to t=4. P2 resumes t=4 to t=5. P1 resumes t=5 to t=13. Total Preemptions = 2!',
  },
  {
    id: 8,
    difficulty: 'DIFFICULT',
    question: 'RESPONSE TIME: Under Pre-emptive Priority scheduling, P1 (AT = 0, BT = 8, Priority = 2) starts running at t=0. P2 (AT = 2, BT = 4, Priority = 1) preempts P1 at t=2 and runs to t=6. P1 resumes at t=6 and finishes at t=10. What is the Response Time (RT) for P1?',
    options: [
      'RT = 0 units',
      'RT = 2 units',
      'RT = 6 units',
      'RT = 10 units',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Response Time is calculated as: RT = First Execution Start Time - Arrival Time. P1 arrived at t=0 and first gained the CPU at t=0. Therefore, RT = 0 - 0 = 0 units!',
  },
  {
    id: 9,
    difficulty: 'DIFFICULT',
    question: 'EQUAL PRIORITY TIE BREAKER: Processes P1 (AT = 1, BT = 4, Priority = 2) and P2 (AT = 1, BT = 3, Priority = 2) share the same priority. Process P0 (AT = 0, BT = 2, Priority = 1) completes at t = 2. Under Non Pre-emptive Priority scheduling, which process executes next and why?',
    options: [
      'P1 executes next because P1 is listed before P2 in process ID order.',
      'P2 executes next because it has a smaller burst time (SJF tie-breaker).',
      'P1 and P2 alternate execution every 1 unit time step.',
      'P2 executes next because it arrived after P0.',
    ],
    correctAnswerIndex: 0,
    explanation:
      'When priority numbers and arrival times are identical (AT=1), OS schedulers use Process ID string order (P1 before P2) as the final deterministic tie-breaker!',
  },
  {
    id: 10,
    difficulty: 'DIFFICULT',
    question: 'THROUGHPUT & UTILIZATION: 4 processes with total burst time of 20 time units run on a single CPU core without any idle time, finishing at t = 20. What is the CPU Utilization percentage and Throughput?',
    options: [
      'CPU Util = 100%, Throughput = 0.20 processes/unit',
      'CPU Util = 80%, Throughput = 0.25 processes/unit',
      'CPU Util = 100%, Throughput = 0.25 processes/unit',
      'CPU Util = 50%, Throughput = 0.50 processes/unit',
    ],
    correctAnswerIndex: 0,
    explanation:
      'CPU Utilization = (Busy Time / Total Time) × 100 = (20 / 20) × 100 = 100%. Throughput = Total Processes Completed / Total Time = 4 / 20 = 0.20 processes per unit time!',
  },
];

export const InteractiveQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const q = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleSelectOption = (optionIndex) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex,
    });
    setShowExplanation({
      ...showExplanation,
      [currentQuestionIndex]: true,
    });
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((quest, idx) => {
      if (selectedAnswers[idx] === quest.correctAnswerIndex) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation({});
    setIsSubmitted(false);
  };

  const finalScore = calculateScore();
  const isPassed = finalScore >= 4;

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            10-Question Masterclass Assessment
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Process Scheduling Priority Quiz
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            4 Easy & 6 Difficult Questions. Score <strong className="text-blue-600">4/10 or greater</strong> to unlock your Certificate of Achievement!
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-all shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Restart Quiz
        </button>
      </div>

      {!isSubmitted ? (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-600 font-mono">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  q.difficulty === 'EASY'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {q.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {QUIZ_QUESTIONS.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                    idx === currentQuestionIndex
                      ? 'bg-blue-600 ring-2 ring-blue-600/30 scale-125'
                      : selectedAnswers[idx] !== undefined
                      ? 'bg-blue-300'
                      : 'bg-slate-200'
                  }`}
                  title={`Q${idx + 1} (${item.difficulty})`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 leading-relaxed whitespace-pre-line">
              {q.question}
            </h3>

            <div className="space-y-2.5">
              {q.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                const isCorrect = q.correctAnswerIndex === optIdx;
                const showExp = showExplanation[currentQuestionIndex];

                let btnStyle = 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800';
                if (showExp) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-50 border-rose-300 text-rose-900';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-xl border text-xs leading-relaxed transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full border border-slate-300 bg-white flex items-center justify-center text-[11px] font-mono shrink-0 mt-0.5">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1">{opt}</span>

                    {showExp && isCorrect && (
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    {showExp && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {showExplanation[currentQuestionIndex] && (
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-slate-800 space-y-1.5">
                <strong className="text-blue-700 font-bold block">Explanation:</strong>
                <p className="leading-relaxed text-slate-700">{q.explanation}</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 text-xs font-semibold transition-all"
            >
              Previous
            </button>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setIsSubmitted(true)}
                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all"
              >
                <span>Complete Assessment</span>
                <Award className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm text-center space-y-6">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-xs ${
              isPassed
                ? 'bg-emerald-100 border border-emerald-300 text-emerald-700'
                : 'bg-amber-100 border border-amber-300 text-amber-700'
            }`}
          >
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-black text-slate-900">
              {isPassed ? 'Assessment Passed!' : 'Assessment Completed'}
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Your Score: <strong className="text-blue-600 text-xl font-mono">{finalScore} / {totalQuestions}</strong> ({Math.round((finalScore / totalQuestions) * 100)}%)
            </p>
          </div>

          {isPassed ? (
            <div className="bg-blue-50/80 border border-blue-200 p-6 rounded-2xl max-w-lg mx-auto space-y-4">
              <div className="flex items-center justify-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
                <Award className="w-4 h-4 text-amber-500" />
                Certificate Unlocked!
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                Congratulations! You scored {finalScore}/10 (40% or higher). Enter your full name below to generate and print your official Certificate of Achievement.
              </p>

              <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-xl p-2 focus-within:border-blue-600">
                <User className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your full name for certificate..."
                  className="w-full text-xs text-slate-900 font-bold focus:outline-none"
                />
              </div>

              <button
                onClick={() => setIsCertModalOpen(true)}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>View & Print Official Certificate</span>
              </button>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl max-w-md mx-auto text-xs text-slate-600">
              Score at least 4/10 to unlock your printable Certificate of Achievement. Retake the quiz or review the masterclass theory!
            </div>
          )}

          <button
            onClick={handleReset}
            className="px-6 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
          >
            Retake Assessment
          </button>
        </div>
      )}

      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        studentName={studentName || 'Learner'}
        score={finalScore}
        totalQuestions={totalQuestions}
      />
    </div>
  );
};
