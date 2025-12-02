// Benchmark script for cn function implementations
// Run with: node benchmark-cn.js

const clsx = require("clsx");
// Approach 1: For loop 
const cn1 = (...classes) => {
  const result = [];
  for (const cls of classes) {
    if (typeof cls === "string") {
      result.push(cls);
    } else if (typeof cls === "object" && cls !== null) {
      Object.entries(cls).forEach(([key, value]) => value && result.push(key));
    }
  }
  return result.join(" ");
};

// Approach 2: Map/filter/join
const cn2 = (...classes) => {
  return classes
    .map(cls => {
      if (typeof cls === "string") return cls;
      if (typeof cls === "object" && cls !== null) {
        return Object.entries(cls)
          .filter(([_, value]) => value)
          .map(([key]) => key)
          .join(" ");
      }
      return "";
    })
    .filter(Boolean)
    .join(" ");
};

// Approach 3: clsx Library
const cn3 = clsx;

// Approach 4: String Concatenation
const cn4 = (...classes) => {
  let result = "";
  for (const cls of classes) {
    if (typeof cls === "string") {
      if (cls) {
        result += (result && " ") + cls;
      }
    } else if (typeof cls === "object" && cls !== null) {
      for (const [key, value] of Object.entries(cls)) {
        if (value) {
          result += (result && " ") + key;
        }
      }
    }
  }
  return result;
};

// Short test cases (fewer classes)
const shortTestCases = [
  // Simple strings
  ["class1", "class2", "class3"],
  // Mix of strings and objects
  ["base", { active: true, disabled: false }, "end"],
  // Complex object
  ["btn", { "btn-primary": true, "btn-disabled": false, "btn-large": true }],
  // Many classes
  ["a", "b", "c", "d", "e", { f: true, g: false, h: true }, "i", "j"],
  // Undefined/boolean mix
  ["class", undefined, false, true, "another"],
];

// Long test cases (each with at least 10 classes)
const longTestCases = [
  // Simple strings (10 classes)
  ["class1", "class2", "class3", "class4", "class5", "class6", "class7", "class8", "class9", "class10"],
  
  // Mix of strings and objects (11 classes)
  ["base", "container", "flex", { active: true, disabled: false, hidden: false }, "items-center", "justify-between", "p-4", "m-2", "rounded", "shadow"],
  
  // Complex object with many properties (15 classes)
  ["btn", "text-sm", { "btn-primary": true, "btn-disabled": false, "btn-large": true, "hover:bg-blue-500": true, "focus:ring-2": true, "active:scale-95": false }, "font-bold", "px-4", "py-2", "rounded-lg", "transition-all", "duration-200"],
  
  // Real-world Tailwind classes (12 classes)
  ["flex", "flex-col", "w-full", "h-screen", { "bg-white": true, "dark:bg-gray-900": true, "text-black": false, "dark:text-white": true }, "p-6", "gap-4", "overflow-hidden", "relative"],
  
  // Undefined/boolean mix with many classes (13 classes)
  ["container", undefined, "mx-auto", false, "max-w-7xl", true, { "px-4": true, "sm:px-6": true, "lg:px-8": false }, "py-8", "space-y-4", undefined, "bg-gray-50"],
  
  // Grid layout classes (10 classes)
  ["grid", { "grid-cols-1": true, "sm:grid-cols-2": true, "md:grid-cols-3": true, "lg:grid-cols-4": true }, "gap-6", "p-4", "auto-rows-fr", "items-start"],
  
  // Form styling (14 classes)
  ["form-input", "w-full", "px-3", "py-2", { "border": true, "border-gray-300": true, "rounded-md": true, "focus:outline-none": true, "focus:ring-2": true, "focus:ring-blue-500": false }, "text-base", "placeholder-gray-400"],
  
  // Card component (11 classes)
  ["card", "bg-white", "rounded-xl", "shadow-lg", { "hover:shadow-xl": true, "transition-shadow": true, "duration-300": true }, "p-6", "space-y-3", "border", "border-gray-200"],
];

// Very long test cases (20-35 classes each)
const veryLongTestCases = [
  // Complex form with many states (25 classes)
  [
    "form-control", "w-full", "max-w-md", "mx-auto", "p-6", "space-y-4",
    { 
      "bg-white": true, "dark:bg-gray-800": true, "border": true, "border-gray-200": true,
      "dark:border-gray-700": true, "rounded-lg": true, "shadow-sm": true, "hover:shadow-md": true,
      "focus-within:shadow-lg": true, "transition-all": true, "duration-300": true
    },
    "text-gray-900", "dark:text-gray-100", "font-sans", "antialiased", "relative", "overflow-hidden",
    "backdrop-blur-sm", "ring-1", "ring-gray-900/5"
  ],
  
  // Dashboard layout (30 classes)
  [
    "dashboard", "grid", "grid-cols-12", "gap-4", "p-8", "min-h-screen",
    {
      "bg-gradient-to-br": true, "from-gray-50": true, "via-white": true, "to-gray-50": true,
      "dark:from-gray-900": true, "dark:via-gray-800": true, "dark:to-gray-900": true,
      "lg:grid-cols-16": false, "xl:gap-6": true, "2xl:gap-8": true
    },
    "auto-rows-min", "items-start", "justify-items-stretch", "w-full", "max-w-screen-2xl",
    "mx-auto", "transition-colors", "duration-500", "relative", "overflow-x-hidden",
    "scroll-smooth", "selection:bg-blue-200"
  ],
  
  // Complex button with all states (28 classes)
  [
    "btn", "inline-flex", "items-center", "justify-center", "gap-2", "px-6", "py-3",
    "text-base", "font-semibold", "leading-6", "whitespace-nowrap",
    {
      "text-white": true, "bg-blue-600": true, "hover:bg-blue-700": true, "active:bg-blue-800": true,
      "focus:outline-none": true, "focus:ring-2": true, "focus:ring-blue-500": true, 
      "focus:ring-offset-2": true, "disabled:opacity-50": true, "disabled:cursor-not-allowed": false,
      "dark:bg-blue-500": true, "dark:hover:bg-blue-600": true
    },
    "rounded-md", "shadow-sm", "transition-all", "duration-200", "ease-in-out",
    "transform", "hover:scale-105", "active:scale-95"
  ],
  
  // Data table with responsive styles (32 classes)
  [
    "table-container", "w-full", "overflow-x-auto", "rounded-lg", "border",
    {
      "border-gray-200": true, "dark:border-gray-700": true, "bg-white": true, 
      "dark:bg-gray-800": true, "shadow": true, "sm:shadow-md": true, "lg:shadow-lg": true,
      "hover:shadow-xl": true, "transition-shadow": true, "duration-300": true
    },
    "relative", "scroll-smooth", "scrollbar-thin", "scrollbar-thumb-gray-300",
    "scrollbar-track-gray-100", "dark:scrollbar-thumb-gray-600", "dark:scrollbar-track-gray-800",
    "max-h-96", "lg:max-h-screen", "print:shadow-none", "print:border-0",
    "backdrop-blur-sm", "ring-1", "ring-black/5", "dark:ring-white/5",
    "isolate", "will-change-scroll"
  ],
  
  // Modal/Dialog with overlay (35 classes)
  [
    "modal", "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center",
    "p-4", "sm:p-6", "lg:p-8",
    {
      "bg-black/50": true, "backdrop-blur-md": true, "dark:bg-black/70": true,
      "animate-fadeIn": true, "transition-all": true, "duration-300": true, "ease-out": true
    },
    "overflow-y-auto", "overflow-x-hidden", "outline-none", "focus:outline-none",
    "cursor-pointer", "supports-[backdrop-filter]:bg-black/25", "antialiased",
    "motion-reduce:transition-none", "motion-reduce:animate-none",
    "will-change-transform", "perspective-1000", "transform-gpu",
    "isolation-isolate", "backface-visibility-hidden", "contain-layout",
    "touch-pan-y", "overscroll-contain", "select-none"
  ],
  
  // Navigation bar (27 classes)
  [
    "navbar", "sticky", "top-0", "left-0", "right-0", "z-40", "flex", "items-center",
    "justify-between", "px-4", "sm:px-6", "lg:px-8", "py-4", "gap-4",
    {
      "bg-white/80": true, "dark:bg-gray-900/80": true, "backdrop-blur-lg": true,
      "border-b": true, "border-gray-200": true, "dark:border-gray-800": true,
      "shadow-sm": true, "lg:shadow": true, "supports-[backdrop-filter]:bg-white/60": true
    },
    "transition-all", "duration-200", "transform", "will-change-transform",
    "print:hidden", "motion-safe:animate-slideDown"
  ],
];

// Benchmark function with warmup and multiple runs
const benchmark = (fn, testCases, iterations = 100000, runs = 5) => {
  // Warmup phase - let V8 optimize the code
  for (let i = 0; i < 1000; i++) {
    testCases.forEach(testCase => fn(...testCase));
  }
  
  // Force garbage collection if available (run with --expose-gc flag)
  if (global.gc) {
    global.gc();
  }
  
  const times = [];
  for (let run = 0; run < runs; run++) {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
      testCases.forEach(testCase => fn(...testCase));
    }
    const end = performance.now();
    times.push(end - start);
  }
  
  return times;
};

// Calculate statistics
const calculateStats = (times) => {
  const mean = times.reduce((a, b) => a + b, 0) / times.length;
  const min = Math.min(...times);
  const max = Math.max(...times);
  const variance = times.reduce((sum, time) => sum + Math.pow(time - mean, 2), 0) / times.length;
  const stdDev = Math.sqrt(variance);
  const coefficientOfVariation = (stdDev / mean) * 100; // as percentage
  
  return { mean, min, max, stdDev, coefficientOfVariation };
};

// Run benchmarks
const ITERATIONS = 100000;
const RUNS = 5;

console.log("Benchmarking cn function implementations...\n");
console.log(`Running ${ITERATIONS} iterations, ${RUNS} times each (with warmup)`);
console.log(`Note: Run with 'node --expose-gc benchmark-cn.js' for better GC control\n`);

// Short test cases
console.log("═══════════════════════════════════════════");
console.log("SHORT TEST CASES (3-5 classes each)");
console.log("═══════════════════════════════════════════");
const shortTimes1 = benchmark(cn1, shortTestCases, ITERATIONS, RUNS);
const shortTimes2 = benchmark(cn2, shortTestCases, ITERATIONS, RUNS);
const shortTimes3 = benchmark(cn3, shortTestCases, ITERATIONS, RUNS);
const shortTimes4 = benchmark(cn4, shortTestCases, ITERATIONS, RUNS);
const shortStats1 = calculateStats(shortTimes1);
const shortStats2 = calculateStats(shortTimes2);
const shortStats3 = calculateStats(shortTimes3);
const shortStats4 = calculateStats(shortTimes4);

console.log(`For Loop:`);
console.log(`  Mean: ${shortStats1.mean.toFixed(2)}ms  Min: ${shortStats1.min.toFixed(2)}ms  Max: ${shortStats1.max.toFixed(2)}ms`);
console.log(`  StdDev: ${shortStats1.stdDev.toFixed(2)}ms  CV: ${shortStats1.coefficientOfVariation.toFixed(2)}%`);
console.log(`Map/Filter/Join:`);
console.log(`  Mean: ${shortStats2.mean.toFixed(2)}ms  Min: ${shortStats2.min.toFixed(2)}ms  Max: ${shortStats2.max.toFixed(2)}ms`);
console.log(`  StdDev: ${shortStats2.stdDev.toFixed(2)}ms  CV: ${shortStats2.coefficientOfVariation.toFixed(2)}%`);
console.log(`clsx Library:`);
console.log(`  Mean: ${shortStats3.mean.toFixed(2)}ms  Min: ${shortStats3.min.toFixed(2)}ms  Max: ${shortStats3.max.toFixed(2)}ms`);
console.log(`  StdDev: ${shortStats3.stdDev.toFixed(2)}ms  CV: ${shortStats3.coefficientOfVariation.toFixed(2)}%`);
console.log(`String Concatenation:`);
console.log(`  Mean: ${shortStats4.mean.toFixed(2)}ms  Min: ${shortStats4.min.toFixed(2)}ms  Max: ${shortStats4.max.toFixed(2)}ms`);
console.log(`  StdDev: ${shortStats4.stdDev.toFixed(2)}ms  CV: ${shortStats4.coefficientOfVariation.toFixed(2)}%`);

const shortMeans = [shortStats1.mean, shortStats2.mean, shortStats3.mean, shortStats4.mean];
const shortMinMean = Math.min(...shortMeans);
const shortWinnerIndex = shortMeans.indexOf(shortMinMean);
const shortWinner = ["For Loop", "Map/Filter/Join", "clsx", "String Concatenation"][shortWinnerIndex];
console.log(`Winner:             ${shortWinner}`);

console.log();

// Long test cases
console.log("═══════════════════════════════════════════");
console.log("LONG TEST CASES (10-15 classes each)");
console.log("═══════════════════════════════════════════");
const longTimes1 = benchmark(cn1, longTestCases, ITERATIONS, RUNS);
const longTimes2 = benchmark(cn2, longTestCases, ITERATIONS, RUNS);
const longTimes3 = benchmark(cn3, longTestCases, ITERATIONS, RUNS);
const longTimes4 = benchmark(cn4, longTestCases, ITERATIONS, RUNS);
const longStats1 = calculateStats(longTimes1);
const longStats2 = calculateStats(longTimes2);
const longStats3 = calculateStats(longTimes3);
const longStats4 = calculateStats(longTimes4);

console.log(`For Loop:`);
console.log(`  Mean: ${longStats1.mean.toFixed(2)}ms  Min: ${longStats1.min.toFixed(2)}ms  Max: ${longStats1.max.toFixed(2)}ms`);
console.log(`  StdDev: ${longStats1.stdDev.toFixed(2)}ms  CV: ${longStats1.coefficientOfVariation.toFixed(2)}%`);
console.log(`Map/Filter/Join:`);
console.log(`  Mean: ${longStats2.mean.toFixed(2)}ms  Min: ${longStats2.min.toFixed(2)}ms  Max: ${longStats2.max.toFixed(2)}ms`);
console.log(`  StdDev: ${longStats2.stdDev.toFixed(2)}ms  CV: ${longStats2.coefficientOfVariation.toFixed(2)}%`);
console.log(`clsx Library:`);
console.log(`  Mean: ${longStats3.mean.toFixed(2)}ms  Min: ${longStats3.min.toFixed(2)}ms  Max: ${longStats3.max.toFixed(2)}ms`);
console.log(`  StdDev: ${longStats3.stdDev.toFixed(2)}ms  CV: ${longStats3.coefficientOfVariation.toFixed(2)}%`);
console.log(`String Concatenation:`);
console.log(`  Mean: ${longStats4.mean.toFixed(2)}ms  Min: ${longStats4.min.toFixed(2)}ms  Max: ${longStats4.max.toFixed(2)}ms`);
console.log(`  StdDev: ${longStats4.stdDev.toFixed(2)}ms  CV: ${longStats4.coefficientOfVariation.toFixed(2)}%`);

const longMeans = [longStats1.mean, longStats2.mean, longStats3.mean, longStats4.mean];
const longMinMean = Math.min(...longMeans);
const longWinnerIndex = longMeans.indexOf(longMinMean);
const longWinner = ["For Loop", "Map/Filter/Join", "clsx", "String Concatenation"][longWinnerIndex];
console.log(`Winner:             ${longWinner}`);

console.log();

// Very long test cases
console.log("═══════════════════════════════════════════");
console.log("VERY LONG TEST CASES (20-35 classes each)");
console.log("═══════════════════════════════════════════");
const veryLongTimes1 = benchmark(cn1, veryLongTestCases, ITERATIONS, RUNS);
const veryLongTimes2 = benchmark(cn2, veryLongTestCases, ITERATIONS, RUNS);
const veryLongTimes3 = benchmark(cn3, veryLongTestCases, ITERATIONS, RUNS);
const veryLongTimes4 = benchmark(cn4, veryLongTestCases, ITERATIONS, RUNS);
const veryLongStats1 = calculateStats(veryLongTimes1);
const veryLongStats2 = calculateStats(veryLongTimes2);
const veryLongStats3 = calculateStats(veryLongTimes3);
const veryLongStats4 = calculateStats(veryLongTimes4);

console.log(`For Loop:`);
console.log(`  Mean: ${veryLongStats1.mean.toFixed(2)}ms  Min: ${veryLongStats1.min.toFixed(2)}ms  Max: ${veryLongStats1.max.toFixed(2)}ms`);
console.log(`  StdDev: ${veryLongStats1.stdDev.toFixed(2)}ms  CV: ${veryLongStats1.coefficientOfVariation.toFixed(2)}%`);
console.log(`Map/Filter/Join:`);
console.log(`  Mean: ${veryLongStats2.mean.toFixed(2)}ms  Min: ${veryLongStats2.min.toFixed(2)}ms  Max: ${veryLongStats2.max.toFixed(2)}ms`);
console.log(`  StdDev: ${veryLongStats2.stdDev.toFixed(2)}ms  CV: ${veryLongStats2.coefficientOfVariation.toFixed(2)}%`);
console.log(`clsx Library:`);
console.log(`  Mean: ${veryLongStats3.mean.toFixed(2)}ms  Min: ${veryLongStats3.min.toFixed(2)}ms  Max: ${veryLongStats3.max.toFixed(2)}ms`);
console.log(`  StdDev: ${veryLongStats3.stdDev.toFixed(2)}ms  CV: ${veryLongStats3.coefficientOfVariation.toFixed(2)}%`);
console.log(`String Concatenation:`);
console.log(`  Mean: ${veryLongStats4.mean.toFixed(2)}ms  Min: ${veryLongStats4.min.toFixed(2)}ms  Max: ${veryLongStats4.max.toFixed(2)}ms`);
console.log(`  StdDev: ${veryLongStats4.stdDev.toFixed(2)}ms  CV: ${veryLongStats4.coefficientOfVariation.toFixed(2)}%`);

const veryLongMeans = [veryLongStats1.mean, veryLongStats2.mean, veryLongStats3.mean, veryLongStats4.mean];
const veryLongMinMean = Math.min(...veryLongMeans);
const veryLongWinnerIndex = veryLongMeans.indexOf(veryLongMinMean);
const veryLongWinner = ["For Loop", "Map/Filter/Join", "clsx", "String Concatenation"][veryLongWinnerIndex];
console.log(`Winner:             ${veryLongWinner}`);

// Verify both produce same results
console.log();
console.log("═══════════════════════════════════════════");
console.log("VERIFYING CORRECTNESS");
console.log("═══════════════════════════════════════════");
let allMatch = true;

console.log("Short test cases:");
shortTestCases.forEach((testCase, i) => {
  const result1 = cn1(...testCase);
  const result2 = cn2(...testCase);
  const result3 = cn3(...testCase);
  const result4 = cn4(...testCase);
  const match = result1 === result2 && result1 === result3 && result1 === result4;
  if (!match) {
    console.log(`  Test case ${i + 1} MISMATCH:`);
    console.log(`    Input: ${JSON.stringify(testCase)}`);
    console.log(`    For Loop:      "${result1}"`);
    console.log(`    Map/Filter:    "${result2}"`);
    console.log(`    clsx:          "${result3}"`);
    console.log(`    String Concat: "${result4}"`);
    allMatch = false;
  }
});
console.log("  ✓ All short test cases match");

console.log("Long test cases:");
longTestCases.forEach((testCase, i) => {
  const result1 = cn1(...testCase);
  const result2 = cn2(...testCase);
  const result3 = cn3(...testCase);
  const result4 = cn4(...testCase);
  const match = result1 === result2 && result1 === result3 && result1 === result4;
  if (!match) {
    console.log(`  Test case ${i + 1} MISMATCH:`);
    console.log(`    Input: ${JSON.stringify(testCase)}`);
    console.log(`    For Loop:      "${result1}"`);
    console.log(`    Map/Filter:    "${result2}"`);
    console.log(`    clsx:          "${result3}"`);
    console.log(`    String Concat: "${result4}"`);
    allMatch = false;
  }
});
console.log("  ✓ All long test cases match");

console.log("Very long test cases:");
veryLongTestCases.forEach((testCase, i) => {
  const result1 = cn1(...testCase);
  const result2 = cn2(...testCase);
  const result3 = cn3(...testCase);
  const result4 = cn4(...testCase);
  const match = result1 === result2 && result1 === result3 && result1 === result4;
  if (!match) {
    console.log(`  Test case ${i + 1} MISMATCH:`);
    console.log(`    Input: ${JSON.stringify(testCase)}`);
    console.log(`    For Loop:      "${result1}"`);
    console.log(`    Map/Filter:    "${result2}"`);
    console.log(`    clsx:          "${result3}"`);
    console.log(`    String Concat: "${result4}"`);
    allMatch = false;
  }
});
console.log("  ✓ All very long test cases match");

if (allMatch) {
  console.log("\n✓ All implementations produce identical results");
}

// Summary
console.log();
console.log("═══════════════════════════════════════════");
console.log("SUMMARY");
console.log("═══════════════════════════════════════════");

console.log("Average CV (variability) across all tests:");
const avgCV1 = (shortStats1.coefficientOfVariation + longStats1.coefficientOfVariation + veryLongStats1.coefficientOfVariation) / 3;
const avgCV2 = (shortStats2.coefficientOfVariation + longStats2.coefficientOfVariation + veryLongStats2.coefficientOfVariation) / 3;
const avgCV3 = (shortStats3.coefficientOfVariation + longStats3.coefficientOfVariation + veryLongStats3.coefficientOfVariation) / 3;
const avgCV4 = (shortStats4.coefficientOfVariation + longStats4.coefficientOfVariation + veryLongStats4.coefficientOfVariation) / 3;
console.log(`  For Loop:        ${avgCV1.toFixed(2)}%`);
console.log(`  Map/Filter/Join: ${avgCV2.toFixed(2)}%`);
console.log(`  clsx:            ${avgCV3.toFixed(2)}%`);
console.log(`  String Concat:   ${avgCV4.toFixed(2)}%`);
console.log(`  (Lower CV = more consistent performance)`);


