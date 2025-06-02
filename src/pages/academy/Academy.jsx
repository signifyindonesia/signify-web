import { useState } from "react";
import {
  FaBook,
  FaGraduationCap,
  FaCheckCircle,
  FaQuestionCircle,
  FaTrophy,
  FaArrowLeft,
} from "react-icons/fa"; // Added FaArrowLeft

const alphabets = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);

const NUM_QUIZ_QUESTIONS = 5;

export default function Academy() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // State for showing quiz within alphabet module
  const [isQuizMode, setIsQuizMode] = useState(false);

  // Quiz State (remains the same)
  const [quizActive, setQuizActive] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [quizEnded, setQuizEnded] = useState(false);

  // Updated modules array
  const modules = [
    { key: "alphabet", label: "Alfabet", icon: FaBook },
    { key: "numbers", label: "Angka (segera)", icon: FaBook },
  ];

  const handleLetterClick = (index) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 300);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
    setIsQuizMode(false); // Reset quiz mode when changing category
    setQuizActive(false);
    setQuizEnded(false);
    setShowFeedback(false);
    setSelectedAnswer(null);
  };

  // --- Quiz Logic (remains mostly the same) ---
  const generateQuizQuestions = () => {
    const shuffledAlphabets = [...alphabets].sort(() => 0.5 - Math.random());
    const newQuestions = [];
    for (let i = 0; i < NUM_QUIZ_QUESTIONS; i++) {
      if (i >= shuffledAlphabets.length) break;
      const correctAnswer = shuffledAlphabets[i];
      const options = [correctAnswer];
      const distractors = [...alphabets]
        .filter((alpha) => alpha !== correctAnswer)
        .sort(() => 0.5 - Math.random());
      for (let j = 0; j < 3 && j < distractors.length; j++) {
        options.push(distractors[j]);
      }
      options.sort(() => 0.5 - Math.random());
      newQuestions.push({
        image: `/alphabets/${correctAnswer}.jpg`,
        options: options,
        correctAnswer: correctAnswer,
        questionText: `Tanda apakah ini untuk huruf...?`,
      });
    }
    setQuizQuestions(newQuestions);
  };

  const handleStartQuiz = () => {
    generateQuizQuestions();
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizActive(true); // Quiz questions are now active
    setQuizEnded(false);
    setSelectedAnswer(null);
    setShowFeedback(false);
    // isQuizMode should already be true when this is called
  };

  const handleAnswerSelect = (answer) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    setShowFeedback(true);
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (answer === currentQuestion.correctAnswer) {
      setFeedbackMessage("Benar!");
      setScore((prevScore) => prevScore + 1);
    } else {
      setFeedbackMessage(
        `Salah. Jawaban yang benar: ${currentQuestion.correctAnswer}`
      );
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setFeedbackMessage("");
    } else {
      setQuizEnded(true);
      setQuizActive(false); // Quiz questions finished, show results
    }
  };

  const handleGoToAlphabetLearning = () => {
    setIsQuizMode(false);
    setQuizActive(false);
    setQuizEnded(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-white flex flex-col overflow-hidden relative">
      {/* Background efek blur bulat */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 right-10 w-64 h-64 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-orange-400 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="w-full py-6 px-6 text-center relative z-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-orange-400 mb-3 drop-shadow-lg">
          Kamus Bahasa Isyarat
        </h1>
        <p className="text-blue-900 max-w-lg mx-auto">
          Pelajari komunikasi tanpa suara dengan koleksi lengkap bahasa isyarat
          Indonesia
        </p>
      </header>

      {/* Pilih Modul */}
      <div className="flex justify-center mt-10 mb-10 px-4 relative z-10">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 w-full max-w-2xl shadow-2xl border border-white/30">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <FaGraduationCap className="text-white text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Pilih Modul Pembelajaran
            </h2>
            <p className="text-gray-600 text-sm">
              Mulai perjalanan belajar bahasa isyarat Anda dengan memilih modul
              sesuai tingkat kemampuan
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {modules.map((mod) => (
              <button
                key={mod.key}
                onClick={() => handleCategoryChange(mod.key)}
                className={`group relative overflow-hidden text-left p-6 rounded-2xl transition-all duration-300 font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                  selectedCategory === mod.key
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white ring-4 ring-blue-200"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full transform translate-x-8 -translate-y-8"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-400 to-pink-500 rounded-full transform -translate-x-6 translate-y-6"></div>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedCategory === mod.key
                          ? "bg-white/20"
                          : "bg-gradient-to-r from-blue-500 to-purple-600"
                      }`}
                    >
                      <mod.icon className="text-lg text-white" />
                    </div>
                    {selectedCategory === mod.key && (
                      <FaCheckCircle className="text-white text-xl" />
                    )}
                  </div>
                  <h3
                    className={`text-lg font-bold mb-2 ${
                      selectedCategory === mod.key
                        ? "text-white"
                        : "group-hover:text-gray-900"
                    } transition-colors`}
                  >
                    {mod.label}
                  </h3>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modul Alphabet with Integrated Quiz */}
      {selectedCategory === "alphabet" && (
        <div className="flex flex-col flex-1 px-4 pb-8 gap-8 max-w-6xl mx-auto w-full">
          {!isQuizMode ? (
            // --- Alphabet Learning UI ---
            <>
              <div className="flex flex-col md:flex-row gap-8">
                {/* Pemilih Huruf */}
                <div className="md:w-1/3 md:max-w-xs">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-6 h-full shadow-xl border border-white/20">
                    <h2 className="text-blue-100 font-semibold mb-4 text-lg text-center">
                      Pilih Huruf
                    </h2>
                    <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-5 gap-2">
                      {alphabets.map((letter, index) => (
                        <button
                          key={letter}
                          onClick={() => handleLetterClick(index)}
                          className={`aspect-square rounded-lg flex items-center justify-center text-lg font-bold shadow-sm transition-all duration-300 hover:scale-105 ${
                            currentIndex === index
                              ? "bg-orange-400 text-white ring-2 ring-white/50"
                              : "bg-white/20 text-blue-100 hover:bg-white/30"
                          }`}
                        >
                          {letter}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Kartu Tampilan */}
                <div className="md:w-2/3 flex flex-col">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-6 flex-1 shadow-xl border border-white/20 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-blue-100 font-semibold text-lg">
                        Visualisasi Isyarat
                      </h2>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-blue-200"></div>
                        <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      </div>
                    </div>

                    <div className="flex-1 flex items-center justify-center bg-white rounded-2xl p-6 overflow-hidden">
                      <div
                        className={`transition-all duration-300 ease-in-out transform ${
                          isAnimating
                            ? "scale-90 opacity-0"
                            : "scale-100 opacity-100"
                        } flex flex-col items-center`}
                      >
                        <div className="bg-gradient-to-br from-blue-600 to-blue-300 p-1 rounded-full mb-6">
                          <div className="rounded-full w-20 h-20 flex items-center justify-center text-white text-5xl font-bold">
                            {alphabets[currentIndex]}
                          </div>
                        </div>
                        <div className="relative">
                          <img
                            src={`/alphabets/${alphabets[currentIndex]}.jpg`}
                            alt={`Isyarat huruf ${alphabets[currentIndex]}`}
                            className="w-64 h-64 object-contain rounded-xl"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center mt-6 space-x-4">
                      <button
                        onClick={() =>
                          handleLetterClick(
                            currentIndex === 0
                              ? alphabets.length - 1
                              : currentIndex - 1
                          )
                        }
                        className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-blue-100"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() =>
                          handleLetterClick(
                            currentIndex === alphabets.length - 1
                              ? 0
                              : currentIndex + 1
                          )
                        }
                        className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-blue-100"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-6 mt-4 shadow-xl border border-white/20">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Huruf "{alphabets[currentIndex]}"
                    </h3>
                    <p className="text-white">
                      Isyarat untuk huruf "{alphabets[currentIndex]}" dibentuk
                      dengan posisi tangan seperti yang ditunjukkan pada gambar.
                      Perhatikan posisi jari dan arah telapak tangan.
                    </p>
                  </div>
                </div>
              </div>
              {/* Tombol untuk memulai kuis alfabet */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    setIsQuizMode(true);
                    handleStartQuiz(); // Start quiz immediately
                  }}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg inline-flex items-center"
                >
                  <FaQuestionCircle className="mr-2" />
                  Mulai Kuis Alfabet
                </button>
              </div>
            </>
          ) : (
            // --- Quiz UI ---
            <div className="w-full max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
                {!quizActive &&
                  !quizEnded && ( // Should not happen if handleStartQuiz is called with setIsQuizMode
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-white mb-3">
                        Memuat Kuis...
                      </h2>
                    </div>
                  )}

                {quizActive && quizQuestions.length > 0 && (
                  <div className="text-white">
                    <div className="flex justify-between items-center mb-1">
                      <button
                        onClick={handleGoToAlphabetLearning}
                        className="font-bold text-white hover:text-black transition-colors flex items-center text-sm"
                      >
                        <FaArrowLeft className="mr-1" /> Kembali ke Alfabet
                      </button>
                    </div>
                    <div className="flex justify-between items-center mb-4 mt-2">
                      <h3 className="text-xl font-semibold">
                        Soal {currentQuestionIndex + 1} dari{" "}
                        {quizQuestions.length}
                      </h3>
                      <p className="text-lg font-semibold">Skor: {score}</p>
                    </div>

                    <div className="bg-white/10 p-4 rounded-xl mb-6 text-center">
                      <p className="text-purple-200 text-sm mb-1">
                        {quizQuestions[currentQuestionIndex].questionText}
                      </p>
                      <img
                        src={quizQuestions[currentQuestionIndex].image}
                        alt="Isyarat kuis"
                        className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-lg mx-auto my-4 border-2 border-white/30 bg-white/5"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                      {quizQuestions[currentQuestionIndex].options.map(
                        (option) => (
                          <button
                            key={option}
                            onClick={() => handleAnswerSelect(option)}
                            disabled={showFeedback}
                            className={`p-4 rounded-lg text-xl font-bold transition-all duration-200
                            ${
                              showFeedback &&
                              option ===
                                quizQuestions[currentQuestionIndex]
                                  .correctAnswer
                                ? "bg-green-500 ring-2 ring-white"
                                : ""
                            }
                            ${
                              showFeedback &&
                              selectedAnswer === option &&
                              option !==
                                quizQuestions[currentQuestionIndex]
                                  .correctAnswer
                                ? "bg-red-500 ring-2 ring-white"
                                : ""
                            }
                            ${
                              !showFeedback && selectedAnswer === option
                                ? "bg-orange-400 ring-2 ring-white"
                                : ""
                            }
                            ${
                              !showFeedback && selectedAnswer !== option
                                ? "bg-white/20 hover:bg-white/30"
                                : ""
                            }
                            ${
                              showFeedback &&
                              selectedAnswer !== option &&
                              option !==
                                quizQuestions[currentQuestionIndex]
                                  .correctAnswer
                                ? "bg-white/20 opacity-70"
                                : ""
                            }
                            ${
                              showFeedback &&
                              !selectedAnswer &&
                              option ===
                                quizQuestions[currentQuestionIndex]
                                  .correctAnswer
                                ? "bg-green-500 ring-2 ring-white"
                                : ""
                            } 
                            disabled:opacity-70 disabled:cursor-not-allowed
                        `}
                          >
                            {option}
                          </button>
                        )
                      )}
                    </div>

                    {showFeedback && (
                      <div
                        className={`text-center p-3 rounded-lg mb-6 font-semibold ${
                          feedbackMessage.startsWith("Benar")
                            ? "bg-green-500/80"
                            : "bg-red-500/80"
                        }`}
                      >
                        {feedbackMessage}
                      </div>
                    )}

                    {showFeedback && (
                      <button
                        onClick={handleNextQuestion}
                        className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-xl text-lg transition-transform transform hover:scale-105 shadow-lg"
                      >
                        {currentQuestionIndex < quizQuestions.length - 1
                          ? "Lanjut ke Soal Berikutnya"
                          : "Lihat Hasil"}
                      </button>
                    )}
                  </div>
                )}

                {quizEnded && (
                  <div className="text-center text-white">
                    <div className="flex justify-start items-center mb-4">
                      <button
                        onClick={handleGoToAlphabetLearning}
                        className="font-bold text-white hover:text-black transition-colors flex items-center text-sm"
                      >
                        <FaArrowLeft className="mr-1" /> Kembali ke Alfabet
                      </button>
                    </div>
                    <FaTrophy className="text-6xl text-yellow-400 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold mb-3">Kuis Selesai!</h2>
                    <p className="text-xl mb-2">Skor Akhir Anda:</p>
                    <p className="text-5xl font-extrabold text-orange-300 mb-6">
                      {score}{" "}
                      <span className="text-3xl text-purple-200">
                        / {quizQuestions.length}
                      </span>
                    </p>
                    <p className="font-bold text-white mb-6">
                      {score === quizQuestions.length
                        ? "Luar biasa! Anda menguasai semua materi."
                        : "Terus berlatih untuk meningkatkan skormu!"}
                    </p>
                    <button
                      onClick={handleStartQuiz}
                      className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded-xl text-lg transition-transform transform hover:scale-105 shadow-lg"
                    >
                      Ulangi Kuis
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
