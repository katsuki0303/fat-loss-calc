"use client";

import { useState } from "react";

export default function Home() {
  const [weight, setWeight] = useState("");
  const [currentBfp, setCurrentBfp] = useState("");
  const [targetBfp, setTargetBfp] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const weightNum = parseFloat(weight);
    const currentBfpNum = parseFloat(currentBfp);
    const targetBfpNum = parseFloat(targetBfp);

    if (isNaN(weightNum) || isNaN(currentBfpNum) || isNaN(targetBfpNum)) {
      setResult("正しい数字を入力してください。");
      return;
    }

    if (
      weightNum <= 0 ||
      currentBfpNum <= 0 ||
      targetBfpNum <= 0 ||
      currentBfpNum >= 100 ||
      targetBfpNum >= 100 ||
      currentBfpNum <= targetBfpNum
    ) {
      setResult("入力値が正しいか確認してください。");
      return;
    }

    // 脂肪量 = 体重 × 体脂肪率
    const fatMass = weightNum * (currentBfpNum / 100);
    // 除脂肪体重 = 体重 - 脂肪量
    const leanMass = weightNum - fatMass;
    // 目標体脂肪率での目標体重 = 除脂肪体重 / (1 - 目標体脂肪率)
    const targetWeight = leanMass / (1 - targetBfpNum / 100);
    // 脂肪だけを落とした場合の減量量
    const fatLoss = weightNum - targetWeight;

    setResult(
      `脂肪のみを落とした場合の目標体重は約 ${targetWeight.toFixed(
        2
      )}kg（-${fatLoss.toFixed(2)}kg）です。`
    );
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100 text-gray-800 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          🎯 体脂肪率から目標体重を計算
        </h1>
        <p className="mb-6 text-center text-sm text-gray-600">
          脂肪だけを減らした場合の理想体重をシミュレーションできます！
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">現在の体重（kg）</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border p-2 rounded"
              required
              step="0.1"
            />
          </div>
          <div>
            <label className="block font-medium">現在の体脂肪率（%）</label>
            <input
              type="number"
              value={currentBfp}
              onChange={(e) => setCurrentBfp(e.target.value)}
              className="w-full border p-2 rounded"
              required
              step="0.1"
            />
          </div>
          <div>
            <label className="block font-medium">目標体脂肪率（%）</label>
            <input
              type="number"
              value={targetBfp}
              onChange={(e) => setTargetBfp(e.target.value)}
              className="w-full border p-2 rounded"
              required
              step="0.1"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full"
          >
            計算する
          </button>
        </form>

        {result && (
          <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded text-center">
            {result}
          </div>
        )}
      </div>
    </main>
  );
}
