class Question {
  constructor(question, valFuncName) {
    this.text = question
    this.valFuncName = valFuncName
    this.answer = false
    this.locked = false
  }
}

class Questionnaire {
  constructor(listOfQuestions) {
    this.questions = []
    for(let question in listOfQuestions) {
      let new_question = new Question(question, listOfQuestions[question])
      this.questions.push(new_question)
    }
  }

  AddFunction(name, func) {
    this[name] = func
  }

  AddOne() {
    return 1
  }

  SubOne() {
    return -1
  }

  AddOrSubIfFirst() {
    if(this.questions[0].answer) return 1
    return -1
  }

  SumQuestions() {
    let reducer = (total, question) => {
      return total + this[question.valFuncName]()
    }
    reducer.bind(this)
    return this.questions.filter(question => !!question.answer ).reduce(reducer, 0)
  }
}

let health_questions = {
  "Does the character live in squalor or filth?": "SubOne",
  "Is the character frail of sickly?": "SubOne",
  "Was the character severely wounded in the past?": "SubOne",
  "Has the character been tortured and enslaved?": "SubOne",
  "Are you a Dwarf, Elf, or Orc?": "AddOne",
  "Is the character athletic and active?": "AddOne",
  "Does the character live in a really clean and happy place?": "AddOne"
}

let steel_questions = {
  "Has the character taken a conscript, soldier, bandit, squire or knight type lifepath?": "AddOne",
  "Has the character ever been severely wounded?": "AddOrSubIfFirst",
  "Has the character ever murdered or killed with his own hands more than once?": "AddOne",
  "Has the characer been tortured, enslaved or beaten terribly over time?": "AddOrSubIfWillHigh",
  "Has the character led a sheltered life, free from violence and pain?": "SubOne",
  "Has the character been raised in a competitive (but non-violent) culture?": "AddOne",
  "Has the characer given birth to a child?": "AddOne",
}


export const HealthQuestionnaire = new Questionnaire(health_questions)
export const SteelQuestionnaire = new Questionnaire(steel_questions)
