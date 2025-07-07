'use client';
import { useState } from 'react';

type Row = { pct: number; wt: number };

export default function Home() {
  const [weight, setWeight] = useState<number>(70);
  const [currentBfp, setCurrentBfp] = useState<number>(20);
  const [targetBfp, setTargetBfp] = useState<number>(10);
  const [step, setStep] = useState<number>(0.5);

  const [lbm, setLbm] = useState<number | null>(null);
  const [targetWeight, setTargetWeight] = useState<number | null>(null);
  const [fatLoss, setFatLoss] = useState<number | null>(null);
  const [simTable, setSimTable] = useState<Row[]>([]);

  const handleCalc = () => {
    if (targetBfp >= currentBfp) {
      alert('目標体脂肪率は現在より低く設定してください');
      return;
    }
    const lean = weight * (1 - currentBfp / 100);
    const tgtWeight = lean / (1 - targetBfp / 100);
    const loss = weight - tgtWeight;

    const rows: Row[] = [];
    for (let p = currentBfp; p > 0; p -= step) {
      const w = lean / (1 - p / 100);
      rows.push({ pct: parseFloat(p.toFixed(1)), wt: parseFloat(w.toFixed(2)) });
    }

    setLbm(parseFloat(lean.toFixed(2)));
    setTargetWeight(parseFloat(tgtWeight.toFixed(2)));
    setFatLoss(parseFloat(loss.toFixed(2)));
    setSimTable(rows);
  }; // ← セミコロン必須

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-6 sm:p-10">
      <div className="max-w-xl mx-auto space-y-10">
        {/* ヘッダー */}
        <header className="text-center">
          <h1 className="text-3xl font-bold mb-2">🎯 体脂肪率から目標体重を計算</h1>
          <p className="text-sm text-gray-600">
            脂肪だけを減らした場合の<strong>理想体重とシミュレーション一覧</strong>を表示します。
          </p>
        </header>

        {/* 入力欄 */}
        <section className="space-y-4">
          <Input label="現体重（kg）" value={weight} onChange={setWeight} min={30} max={200} />
          <Input label="現在の体脂肪率（%）" value={currentBfp} onChange={setCurrentBfp} min={3} max={60} />
          <Input label="目標の体脂肪率（%）" value={targetBfp} onChange={setTargetBfp} min={3} max={60} />
          <Input label="刻み幅（%）" value={step} onChange={setStep} min={0.1} max={5} />

          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            onClick={handleCalc}
          >
            計算する
          </button>
        </section>

        {/* 計算結果 */}
        {lbm !== null && (
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">✅ 計算結果</h2>
            <Result text={`除脂肪体重（LBM）: ${lbm} kg`} color="green" />
            <Result text={`理想体重: ${targetWeight} kg`} color="green" />
            <Result text={`減らす脂肪量: ${fatLoss} kg`} color="blue" />
          </section>
        )}

        {/* シミュレーション表 */}
        {simTable.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-1">📊 シミュレーション</h2>
            <div className="overflow-x-auto border rounded">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">体脂肪率（%）</th>
                    <th className="px-4 py-2 text-left">体重（kg）</th>
                  </tr>
                </thead>
                <tbody>
                  {simTable.map((r) => (
                    <tr key={r.pct} className="border-t">
                      <td className="px-4 py-1">{r.pct}</td>
                      <td className="px-4 py-1">{r.wt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

/* ----- サブコンポーネント ----- */
type InputProps = { label: string; value: number; onChange: (n: number) => void; min: number; max: number };
const Input = ({ label, value, onChange, min, max }: InputProps) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <input
      type="number"
      className="w-full border rounded px-3 py-2"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      min={min}
      max={max}
      step="0.1"
    />
  </div>
);

const Result = ({ text, color }: { text: string; color: 'green' | 'blue' }) => {
  const cls = color === 'green' ? 'bg-green-100 border-green-300' : 'bg-blue-100 border-blue-300';
  return <div className={`${cls} border rounded p-3`}>{text}</div>;
};
