<template>
  <div class="test-page">

    <!-- Ýüklenýär -->
    <div v-if="!subject" class="loading">Ýüklenýär...</div>

    <!-- Netije ekrany -->
    <div v-else-if="finished" class="result-screen">
      <div class="result-card">
        <div class="result-icon">{{ resultIcon }}</div>
        <h2>Test tamamlandy!</h2>
        <p class="result-subject">{{ subject.title }}</p>

        <div class="result-score-circle" :style="{ borderColor: scoreColor }">
          <span class="result-percent">{{ score }}%</span>
          <span class="result-label">{{ resultLabel }}</span>
        </div>

        <div class="result-stats">
          <div class="stat-item correct">
            <span class="stat-num">{{ correctCount }}</span>
            <span class="stat-text">✅ Dogry</span>
          </div>
          <div class="stat-item wrong">
            <span class="stat-num">{{ wrongCount }}</span>
            <span class="stat-text">❌ Ýalňyş</span>
          </div>
          <div class="stat-item total">
            <span class="stat-num">{{ subject.questions.length }}</span>
            <span class="stat-text">📋 Jemi</span>
          </div>
        </div>

        <!-- Jogaplaryň sanawy -->
        <div class="answers-review">
          <h3>Jogaplaryň sanawy</h3>
          <div
            v-for="(q, i) in subject.questions" :key="i"
            :class="['review-item', userAnswers[i] === q.correct ? 'correct' : 'wrong']"
          >
            <div class="review-q">{{ i + 1 }}. {{ q.text }}</div>
            <div class="review-answers">
              <span class="review-yours">Siziň jogabyňyz: <strong>{{ q.options[userAnswers[i]] || '—' }}</strong></span>
              <span class="review-correct" v-if="userAnswers[i] !== q.correct">Dogry jogap: <strong>{{ q.options[q.correct] }}</strong></span>
            </div>
          </div>
        </div>

        <div class="result-actions">
          <button class="btn-retry" @click="restart">🔄 Täzeden geç</button>
          <button class="btn-back" @click="$router.push('/testler')">← Testlere dolan</button>
        </div>
      </div>
    </div>

    <!-- Test ekrany -->
    <div v-else class="quiz-screen">
      <div class="quiz-header">
        <button class="back-btn" @click="$router.push('/testler')">← Yza</button>
        <div class="quiz-title">{{ subject.title }}</div>
        <div class="quiz-timer" :class="{ warning: timeLeft <= 60 }">⏱️ {{ formatTime(timeLeft) }}</div>
      </div>

      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" :style="{ width: ((currentQ + 1) / subject.questions.length * 100) + '%' }"></div>
      </div>

      <div class="quiz-body">
        <div class="question-counter">{{ currentQ + 1 }} / {{ subject.questions.length }}</div>
        <h2 class="question-text">{{ subject.questions[currentQ].text }}</h2>

        <div class="options-list">
          <button
            v-for="(opt, idx) in subject.questions[currentQ].options" :key="idx"
            :class="['option-btn', { selected: userAnswers[currentQ] === idx }]"
            @click="selectAnswer(idx)"
          >
            <span class="option-letter">{{ letters[idx] }}</span>
            <span>{{ opt }}</span>
          </button>
        </div>

        <div class="quiz-nav">
          <button class="nav-btn" @click="prev" :disabled="currentQ === 0">← Öňki</button>
          <div class="q-dots">
            <span
              v-for="(q, i) in subject.questions" :key="i"
              :class="['q-dot', { answered: userAnswers[i] !== undefined, current: i === currentQ }]"
              @click="currentQ = i"
            ></span>
          </div>
          <button v-if="currentQ < subject.questions.length - 1" class="nav-btn" @click="next">Indiki →</button>
          <button v-else class="nav-btn finish" @click="finish">Tamamla ✓</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
const testsData = {
  12: {
    title: 'Introduction to Mathematical Modeling',
    duration: 20 * 60,
    questions: [
      {
        text: '1. What is mathematical modeling?',
        options: ['Drawing pictures', 'Representing real-world systems using mathematics', 'Writing stories'],
        correct: 1
      },
      {
        text: '2. What is the main purpose of a mathematical model?',
        options: ['Entertainment', 'To understand and predict real-world phenomena', 'Decoration'],
        correct: 1
      },
      {
        text: '3. Which of the following is a type of mathematical model?',
        options: ['Biological model', 'Deterministic model', 'Painting model'],
        correct: 1
      },
      {
        text: '4. What does a variable represent in a model?',
        options: ['A constant value', 'A changing quantity', 'A fixed object'],
        correct: 1
      },
      {
        text: '5. What is a parameter in modeling?',
        options: ['A value that changes frequently', 'A fixed value in the model', 'A random guess'],
        correct: 1
      },
      {
        text: '6. Which model includes randomness?',
        options: ['Deterministic model', 'Stochastic model', 'Static model'],
        correct: 1
      },
      {
        text: '7. What is a deterministic model?',
        options: ['A model with random behavior', 'A model with fixed outcomes', 'A model without equations'],
        correct: 1
      },
      {
        text: '8. What is the first step in building a model?',
        options: ['Solving equations', 'Defining the problem', 'Drawing graphs'],
        correct: 1
      },
      {
        text: '9. Why are assumptions important in modeling?',
        options: ['They simplify real-world complexity', 'They make models harder', 'They are not needed'],
        correct: 0
      },
      {
        text: '10. What is validation in modeling?',
        options: ['Ignoring results', 'Checking the model against real data', 'Creating equations'],
        correct: 1
      },
      {
        text: '11. What is a simple example of a model?',
        options: ['A map', 'A song', 'A movie'],
        correct: 0
      },
      {
        text: '12. What does a good model provide?',
        options: ['Confusion', 'Accurate predictions', 'Random results'],
        correct: 1
      },
      {
        text: '13. What is a limitation of models?',
        options: ['They are always perfect', 'They simplify reality', 'They cannot be used'],
        correct: 1
      },
      {
        text: '14. What tool is commonly used in modeling?',
        options: ['Mathematics', 'Music', 'Painting'],
        correct: 0
      },
      {
        text: '15. Why do we refine models?',
        options: ['To make them worse', 'To improve accuracy', 'To delete them'],
        correct: 1
      }
    ]
  },
  13: {
    title: 'Objectives of the Modeling',
    duration: 20 * 60,
    questions: [
      { text: '1. What is one main objective of modeling?', options: ['To entertain people', 'To understand real-world systems', 'To draw pictures'], correct: 1 },
      { text: '2. Why do we simplify systems in modeling?', options: ['To make them more complex', 'To make them easier to study', 'To ignore them'], correct: 1 },
      { text: '3. What does modeling help predict?', options: ['The past', 'The future behavior', 'Random guesses'], correct: 1 },
      { text: '4. How does modeling help in decision-making?', options: ['By confusing data', 'By providing useful insights', 'By ignoring results'], correct: 1 },
      { text: '5. What is "what-if analysis"?', options: ['Ignoring scenarios', 'Testing different situations', 'Writing equations'], correct: 1 },
      { text: '6. Why is modeling cost-effective?', options: ['It avoids real experiments', 'It increases cost', 'It wastes time'], correct: 0 },
      { text: '7. What do models help analyze?', options: ['Colors', 'Relationships between variables', 'Music'], correct: 1 },
      { text: '8. What is the role of models in optimization?', options: ['To worsen performance', 'To improve system performance', 'To stop systems'], correct: 1 },
      { text: '9. Why are graphs used in modeling?', options: ['For decoration', 'To communicate results clearly', 'To confuse readers'], correct: 1 },
      { text: '10. What do models help identify?', options: ['Unimportant data', 'Key factors in a system', 'Random values'], correct: 1 },
      { text: '11. What is a benefit of modeling?', options: ['It always fails', 'It helps understand systems', 'It has no use'], correct: 1 },
      { text: '12. Why do scientists use models?', options: ['For fun only', 'To study real-world problems', 'To avoid work'], correct: 1 },
      { text: '13. What is one limitation of modeling?', options: ['It is always perfect', 'It simplifies reality', 'It gives exact truth'], correct: 1 },
      { text: '14. What does a good model provide?', options: ['Clear understanding', 'Confusion', 'Errors only'], correct: 0 },
      { text: '15. Why do we improve models?', options: ['To make them worse', 'To increase accuracy', 'To delete them'], correct: 1 }
    ]
  },
  14: {
    title: 'Formulation of the Problem. Mathematical Formulation',
    duration: 20 * 60,
    questions: [
      { text: '1. What is the first step in modeling?', options: ['Solving equations', 'Formulating the problem', 'Drawing graphs'], correct: 1 },
      { text: '2. What does problem formulation involve?', options: ['Ignoring the problem', 'Clearly defining the problem', 'Writing code'], correct: 1 },
      { text: '3. What is identified in problem formulation?', options: ['Colors', 'Variables', 'Music'], correct: 1 },
      { text: '4. Why are assumptions used?', options: ['To complicate the model', 'To simplify reality', 'To avoid work'], correct: 1 },
      { text: '5. What is the goal of problem formulation?', options: ['Confusion', 'Clear understanding', 'Decoration'], correct: 1 },
      { text: '6. What is mathematical formulation?', options: ['Writing stories', 'Converting problems into equations', 'Drawing pictures'], correct: 1 },
      { text: '7. What is used in mathematical formulation?', options: ['Symbols and equations', 'Paint', 'Songs'], correct: 0 },
      { text: '8. What does a variable represent?', options: ['A fixed value', 'A changing quantity', 'A color'], correct: 1 },
      { text: '9. What is a parameter?', options: ['A constant value', 'A random number', 'A graph'], correct: 0 },
      { text: '10. Which is an example of mathematical formulation?', options: ['Writing a paragraph', 'P = rt', 'Drawing'], correct: 1 },
      { text: '11. What connects variables in a model?', options: ['Music', 'Equations', 'Colors'], correct: 1 },
      { text: '12. Which comes after problem formulation?', options: ['Mathematical formulation', 'Deleting the model', 'Drawing'], correct: 0 },
      { text: '13. What is needed before writing equations?', options: ['Clear problem definition', 'Random guessing', 'Ignoring data'], correct: 0 },
      { text: '14. What does mathematical formulation help with?', options: ['Understanding relationships', 'Making noise', 'Painting'], correct: 0 },
      { text: '15. What is the result of mathematical formulation?', options: ['A story', 'A mathematical model', 'A drawing'], correct: 1 }
    ]
  },
  15: {
    title: 'The Stages of Modelling',
    duration: 20 * 60,
    questions: [
      { text: '1. What is the first stage of modeling?', options: ['Solving equations', 'Problem identification', 'Validation'], correct: 1 },
      { text: '2. What is done in the assumptions stage?', options: ['Making equations', 'Simplifying reality', 'Solving problems'], correct: 1 },
      { text: '3. What is identified in model formulation?', options: ['Colors', 'Variables and parameters', 'Songs'], correct: 1 },
      { text: '4. What happens in mathematical formulation?', options: ['Drawing', 'Writing equations', 'Ignoring data'], correct: 1 },
      { text: '5. What is the purpose of solving the model?', options: ['To create confusion', 'To find results', 'To draw graphs'], correct: 1 },
      { text: '6. What is interpretation of results?', options: ['Ignoring answers', 'Explaining results in real-world terms', 'Deleting data'], correct: 1 },
      { text: '7. What is validation?', options: ['Guessing', 'Comparing with real data', 'Drawing pictures'], correct: 1 },
      { text: '8. Why do we refine models?', options: ['To worsen them', 'To improve accuracy', 'To delete them'], correct: 1 },
      { text: '9. What type of process is modeling?', options: ['Linear only', 'Cyclical', 'Random'], correct: 1 },
      { text: '10. What comes after solving the model?', options: ['Interpretation', 'Deletion', 'Drawing'], correct: 0 },
      { text: '11. Why are assumptions important?', options: ['They simplify the model', 'They complicate it', 'They are useless'], correct: 0 },
      { text: '12. What is needed before writing equations?', options: ['Problem definition', 'Music', 'Colors'], correct: 0 },
      { text: '13. What do we check in validation?', options: ['Accuracy', 'Color', 'Shape'], correct: 0 },
      { text: '14. What is the goal of modeling stages?', options: ['To confuse', 'To solve real-world problems', 'To draw'], correct: 1 },
      { text: '15. What may happen after validation?', options: ['Refinement', 'Stopping always', 'Ignoring results'], correct: 0 }
    ]
  },
  16: {
    title: 'Basic Concepts of Operations Research',
    duration: 20 * 60,
    questions: [
      { text: '1. What is Operations Research?', options: ['Drawing art', 'Using math to make decisions', 'Writing stories'], correct: 1 },
      { text: '2. What is the main goal of OR?', options: ['Entertainment', 'Better decision-making', 'Decoration'], correct: 1 },
      { text: '3. What is optimization?', options: ['Making random choices', 'Finding the best solution', 'Ignoring data'], correct: 1 },
      { text: '4. What is an objective function?', options: ['A drawing', 'A function to optimize', 'A story'], correct: 1 },
      { text: '5. What are constraints?', options: ['Goals', 'Limitations', 'Solutions'], correct: 1 },
      { text: '6. What is a decision variable?', options: ['Known value', 'Unknown value to determine', 'Fixed number'], correct: 1 },
      { text: '7. What is a feasible solution?', options: ['Any solution', 'A solution satisfying constraints', 'A wrong solution'], correct: 1 },
      { text: '8. What is an optimal solution?', options: ['Worst solution', 'Best feasible solution', 'Random solution'], correct: 1 },
      { text: '9. What is a mathematical model?', options: ['A song', 'A representation using math', 'A picture'], correct: 1 },
      { text: '10. What is Linear Programming?', options: ['Drawing lines', 'Optimization of linear functions', 'Writing code'], correct: 1 },
      { text: '11. What is minimized in some problems?', options: ['Profit', 'Cost', 'Music'], correct: 1 },
      { text: '12. Where is OR used?', options: ['Only in art', 'In business and engineering', 'Nowhere'], correct: 1 },
      { text: '13. What type of problems does OR solve?', options: ['Random problems', 'Decision and optimization problems', 'Painting problems'], correct: 1 },
      { text: '14. What must a feasible solution satisfy?', options: ['Only objective', 'All constraints', 'No rules'], correct: 1 },
      { text: '15. What does OR improve?', options: ['Confusion', 'Efficiency and decisions', 'Noise'], correct: 1 }
    ]
  },
  17: {
    title: 'Tools, Techniques and Applications of Operations Research',
    duration: 20 * 60,
    questions: [
      { text: '1. What are tools in Operations Research?', options: ['Musical instruments', 'Methods and resources used for solving problems', 'Paint'], correct: 1 },
      { text: '2. Which is a tool of OR?', options: ['Mathematics', 'Music', 'Drawing'], correct: 0 },
      { text: '3. What is a technique in OR?', options: ['A method to solve problems', 'A color', 'A story'], correct: 0 },
      { text: '4. Which is a common OR technique?', options: ['Painting', 'Linear Programming', 'Singing'], correct: 1 },
      { text: '5. What is Linear Programming used for?', options: ['Drawing lines', 'Optimization of linear problems', 'Writing songs'], correct: 1 },
      { text: '6. What is Integer Programming?', options: ['Using fractions', 'Using whole number solutions', 'Ignoring numbers'], correct: 1 },
      { text: '7. What does simulation do?', options: ['Ignores systems', 'Imitates real-world processes', 'Deletes data'], correct: 1 },
      { text: '8. What is Queuing Theory?', options: ['Study of music', 'Study of waiting lines', 'Study of colors'], correct: 1 },
      { text: '9. What is Game Theory used for?', options: ['Playing games only', 'Decision-making in competition', 'Drawing'], correct: 1 },
      { text: '10. What do network models solve?', options: ['Painting problems', 'Routing and flow problems', 'Music problems'], correct: 1 },
      { text: '11. Where is OR applied?', options: ['Only in art', 'In business and industry', 'Nowhere'], correct: 1 },
      { text: '12. What is one application of OR in healthcare?', options: ['Drawing', 'Resource management', 'Singing'], correct: 1 },
      { text: '13. What is the purpose of OR in transportation?', options: ['Decoration', 'Route optimization', 'Entertainment'], correct: 1 },
      { text: '14. What do OR tools help with?', options: ['Confusion', 'Problem-solving', 'Noise'], correct: 1 },
      { text: '15. What is the main benefit of OR?', options: ['Waste', 'Better decision-making', 'Errors'], correct: 1 }
    ]
  },
  18: {
    title: 'Introduction to Linear Programming',
    duration: 20 * 60,
    questions: [
      { text: '1. What is Linear Programming?', options: ['A drawing method', 'A mathematical optimization method', 'A music technique'], correct: 1 },
      { text: '2. What is the goal of LP?', options: ['To confuse', 'To find the optimal solution', 'To draw graphs'], correct: 1 },
      { text: '3. What is an objective function?', options: ['A story', 'A function to maximize or minimize', 'A color'], correct: 1 },
      { text: '4. What are decision variables?', options: ['Known values', 'Unknown values', 'Fixed numbers'], correct: 1 },
      { text: '5. What are constraints?', options: ['Goals', 'Restrictions', 'Results'], correct: 1 },
      { text: '6. What type of relationships are used in LP?', options: ['Non-linear', 'Linear', 'Random'], correct: 1 },
      { text: '7. What does "maximize" mean?', options: ['Make as small as possible', 'Make as large as possible', 'Ignore'], correct: 1 },
      { text: '8. What does "minimize" mean?', options: ['Make as large as possible', 'Make as small as possible', 'Ignore'], correct: 1 },
      { text: '9. What is the feasible region?', options: ['Invalid area', 'Area satisfying constraints', 'Random area'], correct: 1 },
      { text: '10. What is an optimal solution?', options: ['Worst solution', 'Best feasible solution', 'Random solution'], correct: 1 },
      { text: '11. What condition ensures variables are positive?', options: ['Equality condition', 'Non-negativity condition', 'Random condition'], correct: 1 },
      { text: '12. Which is an example of LP?', options: ['Z = 2x + 3y', 'Z = x² + y²', 'Z = sin(x)'], correct: 0 },
      { text: '13. Where is LP used?', options: ['Only in art', 'In business and planning', 'Nowhere'], correct: 1 },
      { text: '14. What kind of constraints are used?', options: ['Linear', 'Circular', 'Random'], correct: 0 },
      { text: '15. What does LP improve?', options: ['Confusion', 'Decision-making', 'Noise'], correct: 1 }
    ]
  },
  19: {
    title: 'Linear Programming Problem and Model Formulation',
    duration: 20 * 60,
    questions: [
      { text: '1. What does LPP stand for?', options: ['Linear Programming Problem', 'Logical Programming Plan', 'Linear Plot Program'], correct: 0 },
      { text: '2. What is the goal of LPP?', options: ['Drawing', 'Optimization', 'Painting'], correct: 1 },
      { text: '3. What is the first step in formulation?', options: ['Solve equations', 'Define variables', 'Draw graphs'], correct: 1 },
      { text: '4. What are decision variables?', options: ['Known values', 'Unknown quantities', 'Constants'], correct: 1 },
      { text: '5. What is the objective function?', options: ['A drawing', 'A function to optimize', 'A constraint'], correct: 1 },
      { text: '6. What do constraints represent?', options: ['Goals', 'Limitations', 'Solutions'], correct: 1 },
      { text: '7. What type of equations are used in LPP?', options: ['Linear', 'Circular', 'Random'], correct: 0 },
      { text: '8. What does "maximize" mean?', options: ['Minimize', 'Increase', 'Ignore'], correct: 1 },
      { text: '9. What is a constraint example?', options: ['2x + y ≤ 10', 'x² + y²', 'sin(x)'], correct: 0 },
      { text: '10. What ensures variables are positive?', options: ['Constraint', 'Non-negativity condition', 'Objective function'], correct: 1 },
      { text: '11. What is the result of solving LPP?', options: ['Random value', 'Optimal solution', 'Drawing'], correct: 1 },
      { text: '12. What is needed to build a model?', options: ['Music', 'Real-world data', 'Colors'], correct: 1 },
      { text: '13. What do coefficients represent?', options: ['Random numbers', 'Contribution of variables', 'Colors'], correct: 1 },
      { text: '14. What is a feasible solution?', options: ['Any solution', 'One satisfying constraints', 'Wrong answer'], correct: 1 },
      { text: '15. What is the purpose of formulation?', options: ['Confuse', 'Represent problem mathematically', 'Draw'], correct: 1 }
    ]
  },
  20: {
    title: 'Graphical Solution of Linear Programming Problem',
    duration: 20 * 60,
    questions: [
      { text: '1. What is the graphical method used for?', options: ['Drawing art', 'Solving LPP with graphs', 'Writing code'], correct: 1 },
      { text: '2. How many variables are used in graphical method?', options: ['One', 'Two', 'Five'], correct: 1 },
      { text: '3. What is the first step?', options: ['Drawing graph', 'Defining the problem', 'Solving'], correct: 1 },
      { text: '4. What do we convert inequalities into?', options: ['Pictures', 'Equations', 'Songs'], correct: 1 },
      { text: '5. What is plotted on the graph?', options: ['Colors', 'Constraint lines', 'Music'], correct: 1 },
      { text: '6. What is the feasible region?', options: ['Invalid area', 'Area satisfying all constraints', 'Random area'], correct: 1 },
      { text: '7. Where is the optimal solution found?', options: ['Anywhere', 'Corner points', 'Middle only'], correct: 1 },
      { text: '8. What are corner points?', options: ['Random points', 'Intersection points', 'Colors'], correct: 1 },
      { text: '9. What do we do with corner points?', options: ['Ignore them', 'Test in objective function', 'Delete them'], correct: 1 },
      { text: '10. What does "bounded region" mean?', options: ['Limited area', 'Infinite area', 'Random area'], correct: 0 },
      { text: '11. What does "unbounded region" mean?', options: ['Limited', 'Unlimited', 'Fixed'], correct: 1 },
      { text: '12. What is needed to draw the graph?', options: ['Axes', 'Music', 'Paint'], correct: 0 },
      { text: '13. What is the objective function used for?', options: ['Drawing', 'Finding optimal value', 'Coloring'], correct: 1 },
      { text: '14. What type of lines are used?', options: ['Curved', 'Linear', 'Random'], correct: 1 },
      { text: '15. What is the final step?', options: ['Ignore solution', 'Choose optimal value', 'Draw again'], correct: 1 }
    ]
  },
  21: {
    title: 'Types of Graphical Solution',
    duration: 20 * 60,
    questions: [
      { text: '1. What is a unique optimal solution?', options: ['Many solutions', 'One best solution', 'No solution'], correct: 1 },
      { text: '2. Where is the optimal solution usually found?', options: ['Center', 'Corner point', 'Outside region'], correct: 1 },
      { text: '3. What is a multiple optimal solution?', options: ['One solution', 'Many optimal solutions', 'No solution'], correct: 1 },
      { text: '4. When do multiple solutions occur?', options: ['Randomly', 'Objective function parallel to constraint', 'No constraints'], correct: 1 },
      { text: '5. What is an unbounded solution?', options: ['Limited', 'Infinite', 'Fixed'], correct: 1 },
      { text: '6. When does an unbounded solution occur?', options: ['Closed region', 'Open region', 'No variables'], correct: 1 },
      { text: '7. What is an infeasible solution?', options: ['Valid solution', 'No feasible region', 'Infinite solution'], correct: 1 },
      { text: '8. Why does infeasibility occur?', options: ['Correct constraints', 'Conflicting constraints', 'No equations'], correct: 1 },
      { text: '9. What is a degenerate solution?', options: ['Unique point', 'Overlapping corner points', 'No solution'], correct: 1 },
      { text: '10. What defines the feasible region?', options: ['Objective function', 'Constraints', 'Colors'], correct: 1 },
      { text: '11. What happens in multiple solutions?', options: ['One point only', 'Infinite optimal points', 'No points'], correct: 1 },
      { text: '12. Which solution has no limit?', options: ['Unique', 'Unbounded', 'Infeasible'], correct: 1 },
      { text: '13. Which solution has no feasible region?', options: ['Infeasible', 'Unique', 'Multiple'], correct: 0 },
      { text: '14. What type is most common?', options: ['Unique solution', 'Infeasible', 'Unbounded'], correct: 0 },
      { text: '15. What is needed for any solution?', options: ['Feasible region', 'Music', 'Drawing'], correct: 0 }
    ]
  },
  22: {
    title: 'Basics of Simplex Method',
    duration: 20 * 60,
    questions: [
      { text: '1. What is the Simplex Method used for?', options: ['Drawing', 'Solving LPP', 'Writing'], correct: 1 },
      { text: '2. When is Simplex Method preferred?', options: ['One variable', 'More than two variables', 'No variables'], correct: 1 },
      { text: '3. What type of method is Simplex?', options: ['Graphical', 'Iterative', 'Random'], correct: 1 },
      { text: '4. What is the first step?', options: ['Drawing', 'Convert to standard form', 'Solve directly'], correct: 1 },
      { text: '5. What is added to ≤ constraints?', options: ['Surplus variable', 'Slack variable', 'Random value'], correct: 1 },
      { text: '6. What is added to ≥ constraints?', options: ['Slack variable', 'Surplus variable', 'Color'], correct: 1 },
      { text: '7. What is a simplex table?', options: ['Drawing', 'Organized calculation table', 'Music'], correct: 1 },
      { text: '8. What is a pivot element?', options: ['Random number', 'Key value for iteration', 'Graph point'], correct: 1 },
      { text: '9. What is iteration?', options: ['One step', 'Repeated steps', 'No steps'], correct: 1 },
      { text: '10. What is the goal of simplex method?', options: ['Confusion', 'Optimal solution', 'Drawing'], correct: 1 },
      { text: '11. What is IBFS?', options: ['Initial solution', 'Final solution', 'Random solution'], correct: 0 },
      { text: '12. What does optimality mean?', options: ['Worst solution', 'Best solution', 'No solution'], correct: 1 },
      { text: '13. What happens after pivoting?', options: ['Stop always', 'New solution is obtained', 'Delete table'], correct: 1 },
      { text: '14. When do we stop?', options: ['When optimal is reached', 'At first step', 'Never'], correct: 0 },
      { text: '15. Why is simplex method useful?', options: ['For small problems only', 'For large problems', 'For drawing'], correct: 1 }
    ]
  },
  23: {
    title: 'Simplex Method for Solving Linear Programming Problems',
    duration: 20 * 60,
    questions: [
      { text: '1. What is the simplex method used for?', options: ['Drawing', 'Solving LPP', 'Writing'], correct: 1 },
      { text: '2. What type of process is simplex?', options: ['Random', 'Iterative', 'Static'], correct: 1 },
      { text: '3. What is the first step?', options: ['Solve directly', 'Convert to standard form', 'Draw graph'], correct: 1 },
      { text: '4. What is added to ≤ constraints?', options: ['Surplus variable', 'Slack variable', 'Constant'], correct: 1 },
      { text: '5. What is added to ≥ constraints?', options: ['Slack variable', 'Surplus variable', 'Graph'], correct: 1 },
      { text: '6. What is a simplex tableau?', options: ['Picture', 'Table of values', 'Story'], correct: 1 },
      { text: '7. What is entering variable?', options: ['Variable removed', 'Variable added to improve solution', 'Random variable'], correct: 1 },
      { text: '8. What is leaving variable?', options: ['Variable entering', 'Variable removed from basis', 'Constant'], correct: 1 },
      { text: '9. What is pivot element?', options: ['Random number', 'Key element for transformation', 'Graph point'], correct: 1 },
      { text: '10. What test is used to find leaving variable?', options: ['Ratio test', 'Color test', 'Shape test'], correct: 0 },
      { text: '11. What is the goal of simplex method?', options: ['Confusion', 'Optimal solution', 'Drawing'], correct: 1 },
      { text: '12. When do we stop iterations?', options: ['When no negative values remain', 'At first step', 'Never'], correct: 0 },
      { text: '13. What does RHS mean?', options: ['Right-hand side', 'Random hidden system', 'Real human system'], correct: 0 },
      { text: '14. What happens after pivoting?', options: ['Nothing', 'New solution is obtained', 'Model ends'], correct: 1 },
      { text: '15. Why is simplex method important?', options: ['Only for small problems', 'For solving large optimization problems', 'For drawing'], correct: 1 }
    ]
  },
  24: {
    title: 'Transportation Problem',
    duration: 20 * 60,
    questions: [
      { text: '1. What is a transportation problem?', options: ['Drawing problem', 'Distribution of goods', 'Writing problem'], correct: 1 },
      { text: '2. What is the objective?', options: ['Maximize cost', 'Minimize cost', 'Ignore cost'], correct: 1 },
      { text: '3. What are sources?', options: ['Destinations', 'Supply points', 'Costs'], correct: 1 },
      { text: '4. What are destinations?', options: ['Supply points', 'Demand points', 'Variables'], correct: 1 },
      { text: '5. What is supply?', options: ['Demand', 'Available quantity', 'Cost'], correct: 1 },
      { text: '6. What is demand?', options: ['Supply', 'Required quantity', 'Price'], correct: 1 },
      { text: '7. What is a balanced problem?', options: ['Supply ≠ Demand', 'Supply = Demand', 'No supply'], correct: 1 },
      { text: '8. What is an unbalanced problem?', options: ['Equal', 'Not equal', 'Zero'], correct: 1 },
      { text: '9. What is added in unbalanced case?', options: ['Dummy row/column', 'Equation', 'Graph'], correct: 0 },
      { text: '10. What is the North-West Corner Method?', options: ['Random method', 'Starting from top-left', 'Starting from center'], correct: 1 },
      { text: '11. What is Least Cost Method?', options: ['Highest cost', 'Lowest cost first', 'Random'], correct: 1 },
      { text: '12. What is VAM?', options: ['Basic method', 'Efficient initial method', 'Drawing method'], correct: 1 },
      { text: '13. What is used for optimality test?', options: ['MODI method', 'Music', 'Paint'], correct: 0 },
      { text: '14. What is a cost matrix?', options: ['Graph', 'Table of costs', 'Song'], correct: 1 },
      { text: '15. What type of problem is transportation?', options: ['Linear Programming', 'Drawing', 'Music'], correct: 0 }
    ]
  },
  25: {
    title: 'Basic Feasible Solution of a Transportation Problem',
    duration: 20 * 60,
    questions: [
      { text: '1. What is a Basic Feasible Solution?', options: ['Final solution', 'Initial feasible solution', 'Wrong solution'], correct: 1 },
      { text: '2. What must BFS satisfy?', options: ['Only cost', 'Supply and demand', 'Only variables'], correct: 1 },
      { text: '3. What is the formula for allocations?', options: ['m + n', 'm + n - 1', 'm × n'], correct: 1 },
      { text: '4. What is a non-degenerate BFS?', options: ['Less allocations', 'Exact m + n - 1 allocations', 'No allocations'], correct: 1 },
      { text: '5. What is a degenerate BFS?', options: ['More allocations', 'Less than m + n - 1', 'Equal allocations'], correct: 1 },
      { text: '6. What is used to fix degeneracy?', options: ['Large value', 'Small value (ε)', 'Zero'], correct: 1 },
      { text: '7. What is NW Corner Method?', options: ['Start from center', 'Start from top-left', 'Start from bottom'], correct: 1 },
      { text: '8. What is Least Cost Method?', options: ['Highest cost', 'Lowest cost', 'Random'], correct: 1 },
      { text: '9. What is VAM?', options: ['Simple method', 'Efficient BFS method', 'Graph method'], correct: 1 },
      { text: '10. What is BFS used for?', options: ['Final answer', 'Starting solution', 'Drawing'], correct: 1 },
      { text: '11. What comes after BFS?', options: ['Stop', 'Optimality test', 'Delete'], correct: 1 },
      { text: '12. What is a transportation table?', options: ['Drawing', 'Cost matrix', 'Music'], correct: 1 },
      { text: '13. What is allocation?', options: ['Assigning quantities', 'Drawing', 'Writing'], correct: 0 },
      { text: '14. What happens if supply ≠ demand?', options: ['Ignore', 'Balance with dummy', 'Stop'], correct: 1 },
      { text: '15. What is the goal after BFS?', options: ['Ignore', 'Find optimal solution', 'Draw'], correct: 1 }
    ]
  },
  26: {
    title: 'Modified Distribution Method',
    duration: 20 * 60,
    questions: [
      { text: '1. What is MODI method used for?', options: ['Drawing', 'Optimality test', 'Writing'], correct: 1 },
      { text: '2. What does MODI stand for?', options: ['Modified Distribution Method', 'Modern Data Method', 'Model Design Method'], correct: 0 },
      { text: '3. What is needed before MODI?', options: ['Final solution', 'Basic Feasible Solution', 'Graph'], correct: 1 },
      { text: '4. What are uᵢ and vⱼ?', options: ['Variables', 'Potentials', 'Costs'], correct: 1 },
      { text: '5. What equation is used?', options: ['uᵢ + vⱼ = cᵢⱼ', 'x + y = z', 'a² + b²'], correct: 0 },
      { text: '6. What is Δ (delta)?', options: ['Cost', 'Opportunity cost', 'Variable'], correct: 1 },
      { text: '7. What if all Δ ≥ 0?', options: ['Not optimal', 'Optimal', 'Wrong'], correct: 1 },
      { text: '8. What if Δ < 0 exists?', options: ['Stop', 'Improve solution', 'Ignore'], correct: 1 },
      { text: '9. Which cell is selected?', options: ['Highest cost', 'Most negative Δ', 'Random'], correct: 1 },
      { text: '10. What is a closed loop?', options: ['Circle', 'Adjustment path', 'Drawing'], correct: 1 },
      { text: '11. What happens in loop?', options: ['Random changes', 'Add and subtract allocations', 'Delete values'], correct: 1 },
      { text: '12. What is the goal?', options: ['Maximize cost', 'Minimize cost', 'Ignore'], correct: 1 },
      { text: '13. What happens after improvement?', options: ['Stop always', 'Repeat process', 'Delete table'], correct: 1 },
      { text: '14. What type of method is MODI?', options: ['Initial solution', 'Optimality method', 'Drawing'], correct: 1 },
      { text: '15. What is MODI better than?', options: ['NW method', 'Stepping Stone method', 'Graph'], correct: 1 }
    ]
  }
}

export default {
  name: 'TestPage',
  data() {
    return {
      subject: null,
      currentQ: 0,
      userAnswers: {},
      finished: false,
      timeLeft: 0,
      timer: null,
      letters: ['A', 'B', 'C', 'D']
    }
  },
  computed: {
    correctCount() {
      return this.subject.questions.filter((q, i) => this.userAnswers[i] === q.correct).length
    },
    wrongCount() {
      return this.subject.questions.length - this.correctCount
    },
    score() {
      return Math.round((this.correctCount / this.subject.questions.length) * 100)
    },
    scoreColor() {
      return this.score >= 80 ? '#22c55e' : this.score >= 50 ? '#f59e0b' : '#ef4444'
    },
    resultLabel() {
      return this.score >= 80 ? 'Ajaýyp' : this.score >= 60 ? 'Gowy' : this.score >= 40 ? 'Orta' : 'Pes'
    },
    resultIcon() {
      return this.score >= 80 ? '🏆' : this.score >= 60 ? '👍' : this.score >= 40 ? '📚' : '📖'
    }
  },
  mounted() {
    const id = parseInt(this.$route.params.id)
    this.subject = testsData[id] || null
    if (this.subject) {
      this.timeLeft = this.subject.duration
      this.startTimer()
    }
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--
        } else {
          this.finish()
        }
      }, 1000)
    },
    formatTime(s) {
      const m = Math.floor(s / 60).toString().padStart(2, '0')
      const sec = (s % 60).toString().padStart(2, '0')
      return `${m}:${sec}`
    },
    selectAnswer(idx) {
      this.userAnswers = { ...this.userAnswers, [this.currentQ]: idx }
    },
    next() { if (this.currentQ < this.subject.questions.length - 1) this.currentQ++ },
    prev() { if (this.currentQ > 0) this.currentQ-- },
    finish() {
      clearInterval(this.timer)
      this.finished = true
    },
    restart() {
      this.currentQ = 0
      this.userAnswers = {}
      this.finished = false
      this.timeLeft = this.subject.duration
      this.startTimer()
    }
  }
}
</script>

<style scoped>
.test-page { flex: 1; min-height: 100vh; background: #f4f6fb; }
.loading { text-align: center; padding: 5rem; color: #888; }

/* Header */
.quiz-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1a1a2e;
  color: white;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 10;
}
.back-btn { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 0.4rem 1rem; border-radius: 2px; cursor: pointer; font-family: inherit; font-size: 0.88rem; transition: background 0.2s; }
.back-btn:hover { background: rgba(255,255,255,0.2); }
.quiz-title { font-weight: 700; font-size: 1rem; }
.quiz-timer { font-size: 1rem; font-weight: 700; background: rgba(255,255,255,0.1); padding: 0.4rem 1rem; border-radius: 2px; }
.quiz-timer.warning { background: #ef4444; animation: pulse 1s infinite; }
@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.7; } }

/* Progress */
.quiz-progress-bar { height: 4px; background: #e0e0e0; }
.quiz-progress-fill { height: 100%; background: #1a56db; transition: width 0.3s; }

/* Body */
.quiz-body { max-width: 720px; margin: 0 auto; padding: 2.5rem 2rem; }
.question-counter { font-size: 0.85rem; color: #1a56db; font-weight: 700; margin-bottom: 0.8rem; }
.question-text { font-size: 1.2rem; font-weight: 700; color: #1a1a2e; margin-bottom: 2rem; line-height: 1.5; }

.options-list { display: flex; flex-direction: column; gap: 0.8rem; margin-bottom: 2rem; }
.option-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.2rem;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 2px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.95rem;
  text-align: left;
  transition: all 0.2s;
}
.option-btn:hover { border-color: #1a56db; background: #f0f4ff; }
.option-btn.selected { border-color: #1a56db; background: #1a56db; color: white; }
.option-letter {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f0f4ff;
  color: #1a56db;
  font-weight: 700;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.option-btn.selected .option-letter { background: rgba(255,255,255,0.2); color: white; }

/* Nav */
.quiz-nav { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
.nav-btn { padding: 0.7rem 1.5rem; border: 2px solid #1a1a2e; background: white; color: #1a1a2e; border-radius: 2px; cursor: pointer; font-family: inherit; font-size: 0.9rem; font-weight: 600; transition: all 0.2s; }
.nav-btn:hover:not(:disabled) { background: #1a1a2e; color: white; }
.nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.nav-btn.finish { background: #22c55e; border-color: #22c55e; color: white; }
.nav-btn.finish:hover { background: #16a34a; border-color: #16a34a; }

.q-dots { display: flex; gap: 0.4rem; flex-wrap: wrap; justify-content: center; }
.q-dot { width: 12px; height: 12px; border-radius: 50%; background: #e0e0e0; cursor: pointer; transition: all 0.2s; }
.q-dot.answered { background: #1a56db; }
.q-dot.current { background: #1a1a2e; transform: scale(1.3); }

/* Result */
.result-screen { display: flex; justify-content: center; padding: 3rem 1rem; }
.result-card { background: white; border-radius: 4px; box-shadow: 0 4px 24px rgba(0,0,0,0.1); padding: 2.5rem; max-width: 700px; width: 100%; }
.result-icon { font-size: 3rem; text-align: center; margin-bottom: 0.5rem; }
.result-card h2 { text-align: center; font-size: 1.5rem; font-weight: 800; color: #1a1a2e; margin-bottom: 0.3rem; }
.result-subject { text-align: center; color: #888; font-size: 0.9rem; margin-bottom: 1.5rem; }

.result-score-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 6px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
}
.result-percent { font-size: 1.8rem; font-weight: 800; color: #1a1a2e; line-height: 1; }
.result-label { font-size: 0.8rem; color: #888; margin-top: 0.2rem; }

.result-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem; }
.stat-item { text-align: center; padding: 1rem; border-radius: 2px; display: flex; flex-direction: column; gap: 0.3rem; }
.stat-item.correct { background: #f0fdf4; }
.stat-item.wrong { background: #fef2f2; }
.stat-item.total { background: #f0f4ff; }
.stat-num { font-size: 1.8rem; font-weight: 800; color: #1a1a2e; }
.stat-text { font-size: 0.85rem; color: #666; }

/* Review */
.answers-review { margin-bottom: 2rem; }
.answers-review h3 { font-size: 1rem; font-weight: 700; color: #1a1a2e; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #eee; }
.review-item { padding: 0.9rem 1rem; border-radius: 2px; margin-bottom: 0.5rem; border-left: 4px solid; }
.review-item.correct { background: #f0fdf4; border-color: #22c55e; }
.review-item.wrong { background: #fef2f2; border-color: #ef4444; }
.review-q { font-size: 0.9rem; font-weight: 600; color: #1a1a2e; margin-bottom: 0.4rem; }
.review-answers { display: flex; flex-direction: column; gap: 0.2rem; font-size: 0.83rem; color: #555; }
.review-correct { color: #22c55e; }

.result-actions { display: flex; gap: 1rem; justify-content: center; }
.btn-retry { background: #1a56db; color: white; border: none; padding: 0.8rem 2rem; border-radius: 2px; font-size: 0.95rem; font-weight: 600; cursor: pointer; font-family: inherit; transition: background 0.2s; }
.btn-retry:hover { background: #1d4ed8; }
.btn-back { background: white; color: #1a1a2e; border: 2px solid #1a1a2e; padding: 0.8rem 2rem; border-radius: 2px; font-size: 0.95rem; font-weight: 600; cursor: pointer; font-family: inherit; transition: all 0.2s; }
.btn-back:hover { background: #1a1a2e; color: white; }

@media (max-width: 600px) {
  .quiz-body { padding: 1.5rem 1rem; }
  .result-stats { grid-template-columns: repeat(3, 1fr); }
  .result-actions { flex-direction: column; }
}
</style>
