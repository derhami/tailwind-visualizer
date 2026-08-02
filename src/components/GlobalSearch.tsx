import React, { useState, useEffect, useRef } from 'react';
import { SEARCH_ITEMS } from '../data';
import { Search, X, Copy, Check, Sparkles } from 'lucide-react';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  dir?: 'rtl' | 'ltr';
}

export default function GlobalSearch({ isOpen, onClose, dir = 'rtl' }: GlobalSearchProps) {
  const isEn = dir === 'ltr';
  const [query, setQuery] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredItems = SEARCH_ITEMS.filter(item => {
    const q = query.toLowerCase();
    const descEn = item.descriptionEn || '';
    return (
      item.utility.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      descEn.toLowerCase().includes(q) ||
      item.css.toLowerCase().includes(q)
    );
  });

  const handleCopy = (utility: string) => {
    navigator.clipboard.writeText(utility);
    setCopiedText(utility);
    setTimeout(() => setCopiedText(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-zinc-950/85 p-4 pt-[10vh] backdrop-blur-md">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl rounded-2xl border border-zinc-800/80 bg-zinc-950 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Search bar */}
        <div className="flex h-14 items-center gap-3 border-b border-zinc-800/60 px-4">
          <Search className="h-5 w-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder={isEn ? 'Search Tailwind class or CSS value...' : 'کلاس یا مقدار سی‌اس‌اس تلویند را جستجو کنید...'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`h-full w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none ${isEn ? 'text-left' : 'text-right'}`}
          />
          <button 
            onClick={onClose}
            className="rounded p-1 text-zinc-500 hover:text-white hover:bg-zinc-800/40 shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, i) => {
              const isCopied = copiedText === item.utility;
              const description = isEn ? (item.descriptionEn || item.description) : item.description;
              return (
                <div
                  key={i}
                  onClick={() => handleCopy(item.utility)}
                  className="group flex items-center justify-between gap-3 rounded-xl p-3 hover:bg-zinc-850/40 cursor-pointer transition-all border border-transparent hover:border-zinc-800/60"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 rounded px-2 py-0.5">
                      {item.utility}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">({item.category})</span>
                  </div>

                  <div className="text-left font-mono text-[10px] text-zinc-400 max-w-[180px] truncate">
                    {item.css}
                  </div>

                  <div className={`${isEn ? 'text-left' : 'text-right'} flex items-center gap-2`}>
                    <span className="text-xs text-zinc-300 group-hover:text-white transition-colors">
                      {description}
                    </span>
                    <span className="text-zinc-500 shrink-0">
                      {isCopied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-xs text-zinc-500">
              {isEn ? 'No classes found. Try another search term.' : 'هیچ کلاسی یافت نشد. عبارت دیگری را امتحان کنید.'}
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="flex h-10 items-center justify-between border-t border-zinc-800/40 bg-zinc-950 px-4 text-[10px] text-zinc-500 font-mono">
          <div className="flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-cyan-400" />
            <span>{isEn ? 'Tip: Click any item to copy class' : 'نکته: کلیک روی هر مورد برای کپی کلاس'}</span>
          </div>
          <span>{isEn ? 'Esc to close / Ctrl+K to open' : 'Esc برای خروج / Ctrl K برای باز کردن'}</span>
        </div>
      </div>
    </div>
  );
}
