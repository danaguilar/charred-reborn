import skillsJSON from '../data/gold/skills.json'
import traitsJSON from '../data/gold/traits.json'

const traitsData = traitsJSON
const skillsData = skillsJSON

export class Shade {
  static Black = new Shade('Black');
  static Gray = new Shade('Gray');
  static White = new Shade('White');

  constructor(name) {
    this.name = name;
  }

  toString() {
    if(this.name == "Black") return "B"
    if(this.name == "Gray") return "G"
    if(this.name == "White") return "W"
    return "ERROR"
  }

  ToNumber() {
    if(this.name == "Black") return 0
    if(this.name == "Gray") return 2
    if(this.name == "White") return 4
    return 0
  }
}

export class StatType {
  static Physical = new StatType('Physical');
  static Mental = new StatType('Mental');
  static Derived = new StatType('Derived');

  constructor(name) {
    this.name = name;
  }
}

export class Attribute {
  constructor(name, shade, value, statType) {
    this.name = name
    this.shade = shade
    this.value = value,
    this.statType = statType
  }

  toString() {
    return `${this.shade}${this.value}`
  }

  ValueForAverage(shade) {
    const shadeDiff = this.shade.ToNumber() - shade.ToNumber()
    return this.value + shadeDiff
  }

  UpShade() {
    if(this.value > 5) {
      if(this.shade == Shade.Gray.name) this.shade = Shade.White
      if(this.shade == Shade.Black.name) this.shade = Shade.Gray
      value -= 5
    }
  }

  DownShade() {
    if(this.shade == Shade.Gray.name) this.shade = Shade.Black
    if(this.shade == Shade.White.name) this.shade = Shade.Gray
    value += 5
  }

  ShouldShowPlus() {
    // Should also check highest attribute allowed for race
    return this.statType != StatType.Derived
  }

  ShouldShowMinus() {
    return this.statType != StatType.Derived
  }

  Increment() {
    this.value++
  }

  Decrement() {
    if(this.value > 0) this.value--
  }

  ResetValues() {
    this.value = 0
    this.shade = Shade.Black
  }
}

export class Skill {
  constructor(skillName, isRequired) {
    const skillRoots = skillsData[skillName] ? skillsData[skillName]["roots"] : ["Perception"]
    this.name = skillName
    this.roots = skillRoots
    this.totalPoints = 0
    this.pointsSpent = 0
    this.generalPointsSpent = 0
    this.shade = Shade.Black
    this.final = 0
    this.firstSkill = isRequired
    this.active = true
    this.SetRequired(isRequired)
  }

  DecrementPoints() {
    let minPoints = this.required ? 1 : 0
    if(this.pointsSpent - 1 >= minPoints) {
      this.pointsSpent--
      this.totalPoints--
    }
  }

  IncrementGeneralPoints() {
    this.generalPointsSpent++
    this.totalPoints++
  }
  
  DecrementGeneralPoints() {
    this.generalPointsSpent--
    this.totalPoints--
  }

  IncrementPoints() {
    this.pointsSpent++
    this.totalPoints++
  }

  IsRequired() {
    return this.required
  }

  SetRequired(isRequired) {
    if(this.required == true && isRequired == false && this.pointsSpent == 1) {
      this.pointsSpent = 0
      this.totalPoints = 0
    }
    this.required = isRequired
    if(isRequired && this.pointsSpent < 1) {
      this.IncrementPoints()
    }
  }

  CalculateStartingSkills(characterData) {
    const characterAttrArray = characterData.GetArrayOfAttributes()
    const attributeArr = this.roots.map( attrName => {
      for(let attrIndex in characterAttrArray){
        const characterAttr = characterAttrArray[attrIndex]
        if( attrName == characterAttr.name) return characterAttr
      }
    })

    let newShade = null
    for(let attrIndex in attributeArr) {
      if(!newShade) newShade = attributeArr[attrIndex].shade
      else {
        if(newShade != attributeArr[attrIndex].shade) {
          newShade = Shade.Black
          break
        }
      }
    }
    this.shade = newShade
    const average = Math.floor(attributeArr.reduce((runningTotal, attr) => {
      return runningTotal + attr.ValueForAverage(this.shade)
    }, 0) / attributeArr.length)
    return Math.max(Math.floor(average/2), 1)
  }
}

export class Trait {
 constructor(traitName, isRequired) {
    this.name = traitName,
    this.type = traitsData[traitName].type,
    this.desc =traitsData[traitName].desc,
    this.required = isRequired,
    this.bonus = traitsData[traitName].bonus,
    this.active = true
 }
}

class SkillListItem {
  constructor(name, jsonData) {
    this.name = name
    this.roots = jsonData.roots
    this.type = jsonData.type
    this.isMagic = !!jsonData.magic
    this.unlockonly = !!jsonData.unlockonly
  }
}

class SkillList {
  constructor(jsonData, stock) {
    for(let skillName in jsonData) {
      // Ignore wises
      if(skillName.indexOf("-wise") != -1) continue
      let skillData = jsonData[skillName]
      // Skip skills that cannot be learned by the given stock
      if(!skillData.stock || skillData.stock == stock) {
        if(!this[skillData.type]) {
          this[skillData.type] = []
        }
        this[skillData.type].push(new SkillListItem(skillName, skillData))
      }
    }
  }
}

export const DwarfSkillList = new SkillList(skillsJSON, "dwarven")