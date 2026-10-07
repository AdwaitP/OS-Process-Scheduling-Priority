import React from 'react';
import { Award, Printer, X, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CertificateModal = ({
  isOpen,
  onClose,
  studentName,
  score,
  totalQuestions,
}) => {
  if (!isOpen) return null;

  const percentage = Math.round((score / totalQuestions) * 100);
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const issueId = `OS-PRIO-${Math.floor(100000 + Math.random() * 900000)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto font-sans">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full p-6 shadow-2xl space-y-4 max-h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2 text-slate-800">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold">Official Certificate of Achievement</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          id="printable-certificate"
          className="bg-white border-8 border-slate-900 p-8 md:p-12 rounded-xl text-center space-y-6 relative overflow-hidden print:p-8 print:border-4 print:shadow-none"
        >
          <div className="absolute -top-12 -left-12 w-28 h-28 bg-gradient-to-br from-blue-600 to-indigo-600 rotate-45 pointer-events-none opacity-20" />
          <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-gradient-to-br from-blue-600 to-indigo-600 rotate-45 pointer-events-none opacity-20" />

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-widest font-mono">
              <ShieldCheck className="w-5 h-5 text-amber-500" />
              Official Academic Verification
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-serif uppercase">
              Certificate of Achievement
            </h1>
            <p className="text-xs text-slate-500 font-mono">Operating Systems CPU Scheduling Priority Lab</p>
          </div>

          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 via-amber-500 to-indigo-600 mx-auto rounded-full" />

          <div className="space-y-1 py-2">
            <p className="text-xs text-slate-600 uppercase tracking-wider">This is proudly presented to</p>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 border-b-2 border-slate-200 inline-block pb-1 px-8 font-serif">
              {studentName || 'Learner'}
            </h2>
          </div>

          <p className="text-xs md:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
            for successfully demonstrating mastery in <strong>Operating Systems Process Scheduling Priority</strong> algorithms, including <strong>Pre-emptive Priority</strong> and <strong>Non Pre-emptive Priority</strong> execution, context switching dynamics, and performance metric calculations.
          </p>

          <div className="inline-flex items-center gap-4 bg-slate-50 border border-slate-200 px-6 py-2.5 rounded-full text-xs font-mono">
            <span>Assessment Score: <strong className="text-blue-700 font-bold">{score} / {totalQuestions} ({percentage}%)</strong></span>
            <span>·</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> PASSED
            </span>
          </div>

          <div className="pt-8 border-t border-slate-200 grid grid-cols-2 gap-8 text-left text-xs font-mono text-slate-600">
            <div>
              <p className="text-[10px] text-slate-400 uppercase">Issue Date</p>
              <p className="font-bold text-slate-900">{currentDate}</p>
              <p className="text-[10px] text-slate-400 mt-1">Verification ID: {issueId}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 uppercase">Authorized System</p>
              <p className="font-bold text-slate-900">OS Priority Scheduling Lab</p>
              <p className="text-[10px] text-slate-400 mt-1">Computer Science Interactive Masterclass</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
