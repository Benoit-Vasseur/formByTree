import React, { FormEvent, useState, SyntheticEvent } from "react";

interface QuestionAndAnswers {
  [question: string]: {
    [answser: string]: QuestionAndAnswers | string | null;
  };
}

const App: React.FC<{ questionAndAnswers: QuestionAndAnswers }> = ({
  questionAndAnswers
}) => {
  const [currentQuestionAndAnswers, setCurrentQuestionAndAnswsers] = useState(
    questionAndAnswers
  );
  if (currentQuestionAndAnswers === null) {
    return <p>Merci d'avoir rempli le questionnaire</p>;
  }
  const question = Object.keys(currentQuestionAndAnswers)[0];
  const answsers = Object.keys(currentQuestionAndAnswers[question]);
  return (
    <div className="App">
      <h1>Hello form</h1>
      <form onSubmit={onSubmit}>
        <Question question={question} answers={answsers} />
        <div>
          <input type="submit" value="Ok" />
        </div>
      </form>
    </div>
  );

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const answerElt = event.currentTarget["answer"] as HTMLInputElement;
    setCurrentQuestionAndAnswsers(currentQuestionAndAnswers[question][
      answerElt.value
    ] as QuestionAndAnswers);
  }
};

function Question({
  question,
  answers
}: {
  question: string;
  answers: string[];
}) {
  return (
    <div>
      <p>{question}</p>
      {answers.map(answer => (
        <>
          <input key={"answer" + answer} type="radio" value={answer} name="answer" id={answer} />
          <label key={"label_"+answer} htmlFor={answer}>{answer}</label>
        </>
      ))}
    </div>
  );
}

export default App;
