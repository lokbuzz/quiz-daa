import React, { useState, useEffect } from 'react';
import { Card } from "./components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
<Check /> or <X />

const questions = [
  {
    question: 'Which of the following algorithms uses Divide and Conquer strategy?',
    options: ['Bubble Sort', 'Quick Sort', 'Insertion Sort', 'Selection Sort'],
    answer: 'Quick Sort'
  },
  {
    question: 'What is the time complexity of binary search?',
    options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(n^2)'],
    answer: 'O(log n)'
  },
  {
    question: 'Which algorithm is used to find the shortest path in a graph?',
    options: ['Prim\'s Algorithm', 'Kruskal\'s Algorithm', 'Dijkstra\'s Algorithm', 'DFS'],
    answer: 'Dijkstra\'s Algorithm'
  },
  {
    question: 'Which data structure is used in DFS?',
    options: ['Queue', 'Stack', 'Heap', 'Graph'],
    answer: 'Stack'
  },
  {
    question: 'Which of the following is not a stable sorting algorithm?',
    options: ['Bubble Sort', 'Merge Sort', 'Heap Sort', 'Insertion Sort'],
    answer: 'Heap Sort'
  },
  {
    question: 'Which algorithm is best for finding MST (Minimum Spanning Tree)?',
    options: ['Dijkstra\'s', 'BFS', 'DFS', 'Prim\'s Algorithm'],
    answer: 'Prim\'s Algorithm'
  },
  {
    question: 'The worst-case time complexity of Quick Sort is?',
    options: ['O(n log n)', 'O(n)', 'O(n^2)', 'O(log n)'],
    answer: 'O(n^2)'
  },
  {
    question: 'Which algorithm technique does dynamic programming follow?',
    options: ['Divide and Conquer', 'Greedy', 'Backtracking', 'Overlapping Subproblems'],
    answer: 'Overlapping Subproblems'
  },
  {
    question: 'Merge sort uses which algorithm technique?',
    options: ['Greedy', 'Dynamic Programming', 'Divide and Conquer', 'Backtracking'],
    answer: 'Divide and Conquer'
  },
  {
    question: 'Which of the following problems is solved using backtracking?',
    options: ['Matrix Multiplication', 'Tower of Hanoi', 'N-Queens Problem', 'Floyd Warshall'],
    answer: 'N-Queens Problem'
  },
  {
    question: 'What is the time complexity of Merge Sort?',
    options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(n^2)'],
    answer: 'O(n log n)'
  },
  {
    question: 'Which of the following is a Greedy algorithm?',
    options: ['Dijkstra\'s', 'Floyd Warshall', 'Bellman Ford', 'DFS'],
    answer: 'Dijkstra\'s'
  },
  {
    question: 'Which of the following is not a characteristic of Greedy algorithm?',
    options: ['Optimal Substructure', 'Overlapping Subproblems', 'Greedy Choice Property', 'Feasible Solution'],
    answer: 'Overlapping Subproblems'
  },
  {
    question: 'What is the time complexity of BFS in an adjacency list?',
    options: ['O(V+E)', 'O(V^2)', 'O(E^2)', 'O(VE)'],
    answer: 'O(V+E)'
  },
  {
    question: 'Which sorting algorithm is best in the average case?',
    options: ['Quick Sort', 'Bubble Sort', 'Selection Sort', 'Counting Sort'],
    answer: 'Quick Sort'
  },
  {
    question: 'Which algorithm solves the All-Pairs Shortest Path problem?',
    options: ['Dijkstra\'s', 'Floyd Warshall', 'Prim\'s', 'Kruskal\'s'],
    answer: 'Floyd Warshall'
  },
  {
    question: 'Which algorithm can be used to detect a cycle in a directed graph?',
    options: ['Kruskal\'s', 'DFS', 'Prim\'s', 'BFS'],
    answer: 'DFS'
  },
  {
    question: 'In dynamic programming, solutions are stored in?',
    options: ['Queue', 'Stack', 'Table', 'Heap'],
    answer: 'Table'
  },
  {
    question: 'Which data structure is used in BFS?',
    options: ['Stack', 'Queue', 'Heap', 'Tree'],
    answer: 'Queue'
  },
  {
    question: 'Which of the following is a comparison-based sorting algorithm?',
    options: ['Counting Sort', 'Radix Sort', 'Bucket Sort', 'Quick Sort'],
    answer: 'Quick Sort'
  },
  {
    question: 'What is the average case complexity of Binary Search?',
    options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(n^2)'],
    answer: 'O(log n)'
  },
  {
    question: 'Which algorithm solves 0/1 Knapsack optimally?',
    options: ['Greedy', 'Brute Force', 'Dynamic Programming', 'Divide and Conquer'],
    answer: 'Dynamic Programming'
  },
  {
    question: 'Which problem is solved using the Bellman-Ford algorithm?',
    options: ['Cycle detection', 'Shortest Path with Negative Weights', 'MST', 'DFS'],
    answer: 'Shortest Path with Negative Weights'
  },
  {
    question: 'Which of these is used in Kruskal’s algorithm?',
    options: ['Priority Queue', 'Union-Find', 'Hash Map', 'Queue'],
    answer: 'Union-Find'
  },
  {
    question: 'What is the auxiliary space complexity of Merge Sort?',
    options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'],
    answer: 'O(n)'
  }
];

export default function QuizApp() {
  const [user, setUser] = useState('');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    if (!submitted && startTime) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime, submitted]);

  const handleOptionClick = (option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[current] = option;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const handleSubmit = () => {
    const score = answers.filter((ans, idx) => ans === questions[idx].answer).length;
    const studentResult = { name: user, answers, score };
    const updatedResults = [...results, studentResult];
    setResults(updatedResults);
    setSubmitted(true);
  };

  const downloadCSV = () => {
    const csvRows = [
      ['Name', 'Score', ...questions.map((q, i) => `Q${i + 1}`)].join(','),
      ...results.map(r => [r.name, r.score, ...r.answers].join(','))
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quiz_results.csv';
    a.click();
  };

  if (!user && !submitted) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <Card>
          <CardContent className="space-y-4">
            <h1 className="text-xl font-bold">Enter Your Name to Start the Quiz</h1>
            <Input placeholder="Your name" onChange={(e) => setUser(e.target.value)} />
            <Button onClick={() => setStartTime(Date.now())} disabled={!user}>Start Quiz</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (submitted && showReview) {
    const correctAnswers = questions.map((q, i) => ({
      question: q.question,
      yourAnswer: answers[i],
      correctAnswer: q.answer,
      isCorrect: answers[i] === q.answer
    }));
    return (
      <div className="p-4 max-w-2xl mx-auto space-y-4">
        <h2 className="text-xl font-bold">Review Answers</h2>
        {correctAnswers.map((item, index) => (
          <Card key={index} className="p-2">
            <div><strong>Q{index + 1}:</strong> {item.question}</div>
            <div>Your Answer: {item.yourAnswer || 'No answer'} {item.isCorrect ? '?' : '?'}</div>
            {!item.isCorrect && <div>Correct Answer: {item.correctAnswer}</div>}
          </Card>
        ))}
        <Button onClick={() => setShowReview(false)}>Hide Review</Button>
        <Button variant="secondary" onClick={downloadCSV} className="ml-2">Download Results</Button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="p-4 max-w-md mx-auto text-center space-y-4">
        <h2 className="text-2xl font-bold">Thank you for submitting, {user}!</h2>
        <p>Your score: {answers.filter((ans, idx) => ans === questions[idx].answer).length} / {questions.length}</p>
        <Button onClick={() => setUser('')}>Restart</Button>
        <Button onClick={() => setShowReview(true)}>Review Answers</Button>
        <Button variant="secondary" onClick={downloadCSV} className="ml-2"><Download className="inline mr-2" />Download Results</Button>
      </div>
    );
  }

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const question = questions[current];
  const selected = answers[current];

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <div className="text-right font-semibold">Time Left: {mins}:{secs < 10 ? `0${secs}` : secs}</div>
      <Card>
        <CardContent>
          <div className="text-lg font-semibold">Q{current + 1}: {question.question}</div>
          <div className="grid gap-2 mt-4">
            {question.options.map((opt, i) => (
              <Button
                key={i}
                variant={selected === opt ? 'default' : 'outline'}
                onClick={() => handleOptionClick(opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            {current < questions.length - 1 ? (
              <Button onClick={handleNext} disabled={!selected}>Next</Button>
            ) : (
              <Button onClick={handleSubmit} disabled={answers.length < questions.length}>Submit</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
